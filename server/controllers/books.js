import { ctrlWrapper } from '../helpers/index.js';
import { saveFileToCloudinary, deleteFileFromCloudinary } from '../cloudinary/helpers/index.js';
import Book from '../models/book.js';

const bookImageConfig = {
  folder: 'books',
  width: 250,
  height: 328,
};

const getAllBooks = async (req, res) => {
  const books = await Book.find({}, '-createdAt -updatedAt -cloudinaryImagePath');
  res.json(books);
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    throw HttpError(404);
  }

  res.json(book);
};

const createBook = async (req, res) => {
  const { url, cloudinaryFilePath } = await saveFileToCloudinary({
    path: req.file.path,
    ...bookImageConfig,
  });

  const newBook = await Book.create({
    ...req.body,
    image: url,
    cloudinaryImagePath: cloudinaryFilePath,
  });

  res.status(201).json(newBook);
};

const deleteBookById = async (req, res) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndDelete(id);

  if (!deletedBook) {
    throw HttpError(404);
  }

  await deleteFileFromCloudinary(deletedBook.cloudinaryImagePath);

  res.json(deletedBook);
};

export default {
  getAllBooks: ctrlWrapper(getAllBooks),
  getBookById: ctrlWrapper(getBookById),
  createBook: ctrlWrapper(createBook),
  deleteBookById: ctrlWrapper(deleteBookById),
};
