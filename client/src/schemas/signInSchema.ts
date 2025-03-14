import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email must be a valid email address'),
  password: z.string().trim().min(1, 'Password is required'),
});

export default signInSchema;
