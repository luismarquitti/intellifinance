import { hashPassword, comparePassword } from './password';

describe('Password Service', () => {
  it('should hash a password and successfully compare it', async () => {
    const password = 'mysecretpassword';
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).not.toBe(password);

    const isMatch = await comparePassword(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it('should return false for a mismatched password', async () => {
    const password = 'mysecretpassword';
    const wrongPassword = 'wrongpassword';
    const hashedPassword = await hashPassword(password);

    const isMatch = await comparePassword(wrongPassword, hashedPassword);
    expect(isMatch).toBe(false);
  });
});
