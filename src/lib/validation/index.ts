import * as z from 'zod';

// signup form validation
export const SignupValidationSchema = z.object({
  name: z.string().min(2, { message: 'Too Short' }),
  username: z.string().min(2, { message: 'Too short' }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be of atleast 8 chars' }),
});

// sign in validation
export const SigninValidationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be of atleast 8 chars' }),
});

// post form validation
export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});
