import { z } from 'zod';

import { validatePasswordStrength } from '../helpers';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../constants';

const signUpSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Email must be a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .refine(
        password => validatePasswordStrength(password).isStrong,
        password => ({ message: validatePasswordStrength(password).message })
      ),
    confirmPassword: z.string().optional(),
    avatar: z
      .instanceof(File)
      .optional()
      .refine(file => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: 'Avatar must be in PNG, JPEG, JPG, or WEBP format',
      })
      .refine(file => !file || file.size <= MAX_FILE_SIZE, {
        message: 'Avatar size must be less than 1MB',
      }),
    licenseAccepted: z.boolean().refine(value => value === true, {
      message: 'You must accept the license',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export default signUpSchema;
