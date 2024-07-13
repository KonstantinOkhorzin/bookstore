import express from 'express';

import booksController from '../controllers/books/index.js';
import { addBookSchema } from '../schemas/book.js';
import {
  authenticate,
  isAdmin,
  uploadFile,
  validateBody,
  isValidId,
} from '../middlewares/index.js';

const router = express.Router();

router.get('/', authenticate, booksController.getAllBooks);

router.get('/:id', authenticate, isValidId, booksController.getBookById);

router.post(
  '/',
  authenticate,
  isAdmin,
  uploadFile.single('image'),
  validateBody(addBookSchema),
  booksController.createBook
);

router.delete('/:id', authenticate, isAdmin, isValidId, booksController.deleteBookById);

export default router;
