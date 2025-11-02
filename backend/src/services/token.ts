import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('Missing JWT secrets. Please set ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET in your .env file.');
}

interface TokenPayload {
  userId: string;
}

export const generateAccessToken = (userId: string): string => {
  const payload: TokenPayload = { userId };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: string): string => {
  const payload: TokenPayload = { userId };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string, secret: string): TokenPayload | null => {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};
