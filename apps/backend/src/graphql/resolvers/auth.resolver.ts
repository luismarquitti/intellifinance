import { AuthService } from '../../services/auth.service';
import { RegisterInput, LoginInput } from '@intellifinance/types';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      // Middleware ensures context.user exists if protected
      return context.user;
    },
  },
  Mutation: {
    register: async (_: any, { input }: { input: RegisterInput }) => {
      return AuthService.register(input);
    },
    login: async (_: any, { input }: { input: LoginInput }) => {
      return AuthService.login(input);
    },
    refreshToken: async (_: any, { token }: { token: string }) => {
      return AuthService.refreshToken(token);
    }
  },
};
