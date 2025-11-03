import { hashPassword, comparePassword } from '../services/password';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../services/token';
import { User } from '../models/user';
import { logger } from '../logger';
import pool from '../db';

// This will be our placeholder for invalidated refresh tokens.
const invalidatedRefreshTokens = new Set<string>();

export const authResolvers = {
  Mutation: {
    register: async (_: any, { email, password }: any) => {
      logger.info(`Registration attempt for email: ${email}`);
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format.');
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
      }
      const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        throw new Error('User with this email already exists.');
      }
      const hashedPassword = await hashPassword(password);
      const newUserResult = await pool.query(
        'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
        [email, hashedPassword]
      );
      const newUser: User = newUserResult.rows[0];
      logger.info(`User ${email} registered successfully.`);
      const accessToken = generateAccessToken(newUser.id);
      const refreshToken = generateRefreshToken(newUser.id);
      return { accessToken, refreshToken, user: newUser };
    },
    login: async (_: any, { email, password }: any) => {
      logger.info(`Login attempt for email: ${email}`);
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      if (!user) {
        throw new Error('Invalid credentials.');
      }
      const isMatch = await comparePassword(password, user.password_hash);
      if (!isMatch) {
        throw new Error('Invalid credentials.');
      }
      logger.info(`User ${email} logged in successfully.`);
      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);
      return { accessToken, refreshToken, user };
    },
    logout: async (_: any, { refreshToken }: any) => {
      logger.info('Logout attempt');
      if (!refreshToken) {
        throw new Error('Refresh token is required.');
      }
      invalidatedRefreshTokens.add(refreshToken);
      logger.info('Logout successful');
      return { success: true };
    },
    refreshToken: async (_: any, { refreshToken }: any) => {
      logger.info('Refresh token attempt');
      if (!refreshToken) {
        throw new Error('Refresh token is required.');
      }
      if (invalidatedRefreshTokens.has(refreshToken)) {
        throw new Error('Invalid refresh token.');
      }
      const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
      if (!payload) {
        throw new Error('Invalid refresh token.');
      }
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [payload.userId]);
      const user = result.rows[0];
      if (!user) {
        throw new Error('User not found.');
      }
      logger.info('Refresh token successful');
      const accessToken = generateAccessToken(user.id);
      return { accessToken };
    },
  },
};
