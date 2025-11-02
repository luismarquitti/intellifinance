import { User } from './user';

export interface RefreshToken {
  id: string;
  userId: User['id'];
  token: string;
  expiresAt: Date;
}
