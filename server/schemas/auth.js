import Joi from 'joi';
import { Schema } from 'mongoose';

import { validatePasswordStrength } from '../helpers/index.js';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    cloudinaryAvatarPath: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const passwordSchema = Joi.string()
  .custom((value, helpers) => {
    const { isStrengthPassword, strengthMessage } = validatePasswordStrength(value);
    if (!isStrengthPassword) {
      return helpers.message(strengthMessage);
    }
    return value;
  })
  .required()
  .messages({
    'any.required': 'Password is required',
    'string.empty': `Password cannot be an empty field`,
  });

const emailSchema = Joi.string().email().required().messages({
  'string.email': 'Email must be a valid email address',
  'string.empty': `Email cannot be an empty field`,
  'any.required': 'Email is required',
});

export const loginSchema = Joi.object({
  email: emailSchema,
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': `Password cannot be an empty field`,
  }),
});

export const registerSchema = loginSchema.keys({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': `Name cannot be an empty field`,
  }),
  password: passwordSchema,
  licenseAccepted: Joi.boolean().valid(true).required().messages({
    'any.only': 'You must accept the license',
    'any.required': 'License acceptance is required',
  }),
});
