import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterInput, LoginInput } from '@intellifinance/types';

const prisma = new PrismaClient();

export class AuthService {
  private static ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
  private static REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

  static async register(input: RegisterInput) {
    const { email, password, fullName } = input;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName,
      },
    });

    // Generate tokens
    const token = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return {
      token,
      refreshToken,
      user,
    };
  }

  static async login(input: LoginInput) {
    const { email, password } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return {
      token,
      refreshToken,
      user,
    };
  }

  private static generateAccessToken(userId: string) {
    return jwt.sign({ userId }, this.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  }

  private static generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, this.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  }

  static async refreshToken(token: string) {
    try {
      const payload = jwt.verify(token, this.REFRESH_TOKEN_SECRET) as { userId: string };

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // No rotation for MVP as per spec clarification
      return {
        token: this.generateAccessToken(user.id),
        refreshToken: token, // Return same refresh token
        user,
      };
    } catch (e) {
      throw new Error('Invalid refresh token');
    }
  }
}
