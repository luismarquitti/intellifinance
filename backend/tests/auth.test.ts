import { authResolvers } from '../src/api/auth';

describe('Auth Resolvers', () => {
  let refreshToken = '';

  describe('Mutation: register', () => {
    it('should register a new user and return tokens', async () => {
      const args = { email: 'test@example.com', password: 'password123' };
      const result = await authResolvers.Mutation.register(null, args);
      refreshToken = result.refreshToken;

      expect(result.user).toBeDefined();
      expect(result.accessToken).toBeDefined();
    });
  });

  describe('Mutation: login', () => {
    it('should log in an existing user and return tokens', async () => {
      const loginArgs = { email: 'test@example.com', password: 'password123' };
      const result = await authResolvers.Mutation.login(null, loginArgs);
      refreshToken = result.refreshToken;

      expect(result.user).toBeDefined();
      expect(result.accessToken).toBeDefined();
    });
  });

  describe('Mutation: refreshToken', () => {
    it('should return a new access token', async () => {
      const args = { refreshToken };
      const result = await authResolvers.Mutation.refreshToken(null, args);

      expect(result.accessToken).toBeDefined();
    });

    it('should throw an error for an invalid refresh token', async () => {
      const args = { refreshToken: 'invalidtoken' };
      await expect(authResolvers.Mutation.refreshToken(null, args)).rejects.toThrow('Invalid refresh token.');
    });
  });

  describe('Mutation: logout', () => {
    it('should invalidate the refresh token', async () => {
      const args = { refreshToken };
      const result = await authResolvers.Mutation.logout(null, args);
      expect(result.success).toBe(true);

      await expect(authResolvers.Mutation.refreshToken(null, args)).rejects.toThrow('Invalid refresh token.');
    });
  });
});
