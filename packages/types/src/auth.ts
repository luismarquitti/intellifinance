import { z } from 'zod';

export const RegisterInputSchema = z.object({
  email: z.string().email().transform(val => val.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
});

export const LoginInputSchema = z.object({
  email: z.string().email().transform(val => val.toLowerCase()),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof RegisterInputSchema>;
export type LoginInput = z.infer<typeof LoginInputSchema>;
