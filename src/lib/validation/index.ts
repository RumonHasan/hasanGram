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
