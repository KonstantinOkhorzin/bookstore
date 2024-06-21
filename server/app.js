import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import multer from 'multer';

import authRouter from './routes/auth.js';
import booksRouter from './routes/books.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);
app.use('/api/books', booksRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    res.status(400).json({ message: 'Avatar size is too large' });
  } else {
    const { status = 500, message = 'Server error' } = error;
    res.status(status).json({ message });
  }
});

export default app;
