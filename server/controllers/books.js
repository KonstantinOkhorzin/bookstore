import { ctrlWrapper, saveFileToCloudinary } from '../helpers/index.js';
import Book from '../models/book.js';

const bookImageConfig = {
  folder: 'books',
  width: 250,
  height: 328,
};

const getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
}

const createBook = async (req, res) => {
  const image = await saveFileToCloudinary({
    path: req.file.path,
    ...bookImageConfig,
  });

  const newBook = await Book.create({ ...req.body, image });

  res.status(201).json(newBook);
};

export default {
  getAllBooks: ctrlWrapper(getAllBooks),
  createBook: ctrlWrapper(createBook),
};
