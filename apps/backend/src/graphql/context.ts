import { Request } from 'express';
import jwt from 'jsonwebtoken';

export const getUserFromToken = (token: string) => {
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'access_secret') as { userId: string };
      return decoded;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const context = async ({ req }: { req: Request }) => {
  const token = req.headers.authorization || '';
  // Remove "Bearer " prefix if present
  const actualToken = token.replace('Bearer ', '');
  const user = getUserFromToken(actualToken);
  return { user };
};
