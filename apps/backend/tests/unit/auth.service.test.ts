import { AuthService } from '../../src/services/auth.service';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock dependencies
jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let prisma: any;

  beforeEach(() => {
    jest.clearAllMocks();
    prisma = new PrismaClient();
  });

  describe('register', () => {
    it('should register a new user and return tokens', async () => {
      const input = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
      };
      const hashedPassword = 'hashed_password';
      const createdUser = {
        id: 'user-id',
        ...input,
        passwordHash: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword as never);
      (prisma.user.create as jest.Mock).mockResolvedValue(createdUser);
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const result = await AuthService.register(input);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: input.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(input.password, 10);
      expect(prisma.user.create).toHaveBeenCalled();
      expect(result).toHaveProperty('token', 'token');
      expect(result).toHaveProperty('refreshToken', 'token');
      expect(result.user.email).toBe(input.email);
    });

    it('should throw error if user already exists', async () => {
      const input = {
        email: 'existing@example.com',
        password: 'password123',
        fullName: 'Existing User',
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: '1', ...input });

      await expect(AuthService.register(input)).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const input = {
        email: 'test@example.com',
        password: 'password123',
      };
      const hashedPassword = 'hashed_password';
      const user = {
        id: 'user-id',
        email: input.email,
        passwordHash: hashedPassword,
        fullName: 'Test User',
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const result = await AuthService.login(input);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: input.email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(input.password, hashedPassword);
      expect(result).toHaveProperty('token', 'token');
      expect(result.user.email).toBe(input.email);
    });

    it('should throw error for invalid email', async () => {
      const input = { email: 'wrong@example.com', password: 'password123' };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(AuthService.login(input)).rejects.toThrow('Invalid credentials');
    });

    it('should throw error for invalid password', async () => {
       const input = { email: 'test@example.com', password: 'wrongpassword' };
       const user = { id: '1', email: input.email, passwordHash: 'hash' };

       (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
       (bcrypt.compare as jest.Mock).mockResolvedValue(false);

       await expect(AuthService.login(input)).rejects.toThrow('Invalid credentials');
    });
  });
});
