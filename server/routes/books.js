import express from 'express';

import booksController from '../controllers/books.js';
import { addBookSchema } from '../schemas/book.js';
import { authenticate, isAdmin, uploadFile, validateBody } from '../middlewares/index.js';

const router = express.Router();

router.get('/', authenticate, booksController.getAllBooks);

router.post(
  '/',
  authenticate,
  isAdmin,
  uploadFile.single('image'),
  validateBody(addBookSchema),
  booksController.createBook
);

export default router;
