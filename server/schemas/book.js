import Joi from 'joi';
import { Schema } from 'mongoose';

export const bookSchema = new Schema(
  {
    author: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    level: { type: String, required: true },
    tags: { type: [String], required: true },
    amount: { type: Number, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

export const addBookSchema = Joi.object({
  author: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  title: Joi.string().required(),
  level: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  amount: Joi.number().integer().required(),
  shortDescription: Joi.string().required(),
  description: Joi.string().required(),
});