jest.mock('../src/db');
jest.mock('../src/services/password');
jest.mock('../src/services/token');

import { authResolvers } from '../src/api/auth';
import * as passwordService from '../src/services/password';
import * as tokenService from '../src/services/token';
import pool from '../src/db';

describe('Auth Resolvers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Mutation: register', () => {
    it('should register a new user and return tokens', async () => {
      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [] }) // For existing user check
        .mockResolvedValueOnce({ rows: [{ id: '1' }] }); // For new user insertion
      (passwordService.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
      (tokenService.generateAccessToken as jest.Mock).mockReturnValue('accessToken');
      (tokenService.generateRefreshToken as jest.Mock).mockReturnValue('refreshToken');


      const result = await authResolvers.Mutation.register(null, { email: 'test@example.com', password: 'password' });

      expect(result).toHaveProperty('accessToken', 'accessToken');
      expect(result).toHaveProperty('refreshToken', 'refreshToken');
    });
  });

  describe('Mutation: login', () => {
    it('should log in an existing user and return tokens', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: '1', password_hash: 'hashedPassword' }] });
        (passwordService.comparePassword as jest.Mock).mockResolvedValue(true);
        (tokenService.generateAccessToken as jest.Mock).mockReturnValue('accessToken');
        (tokenService.generateRefreshToken as jest.Mock).mockReturnValue('refreshToken');


      const result = await authResolvers.Mutation.login(null, { email: 'test@example.com', password: 'password' });

      expect(result).toHaveProperty('accessToken', 'accessToken');
      expect(result).toHaveProperty('refreshToken', 'refreshToken');
    });
  });

  describe('Mutation: refreshToken', () => {
    it('should return a new access token', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: '1' }] });
        (tokenService.verifyToken as jest.Mock).mockReturnValue({ userId: '1' });
        (tokenService.generateAccessToken as jest.Mock).mockReturnValue('newAccessToken');

      const result = await authResolvers.Mutation.refreshToken(null, { refreshToken: 'refreshToken' });

      expect(result).toEqual({ accessToken: 'newAccessToken' });
    });
});

  describe('Mutation: logout', () => {
    it('should invalidate the refresh token', async () => {
      const result = await authResolvers.Mutation.logout(null, { refreshToken: 'refreshToken' });

      expect(result).toEqual({ success: true });
    });
  });
});
