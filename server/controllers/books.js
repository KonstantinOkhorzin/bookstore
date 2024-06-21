import { ctrlWrapper, saveFileToCloudinary } from '../helpers/index.js';
import Book from '../models/book.js';

const bookImageConfig = {
  folder: 'books',
  width: 250,
  height: 328,
};

const createBook = async (req, res) => {
  const image = await saveFileToCloudinary({
    path: req.file.path,
    ...bookImageConfig,
  });

  const newBook = await Book.create({ ...req.body, image });

  res.status(201).json(newBook);
};

export default {
  createBook: ctrlWrapper(createBook),
};
