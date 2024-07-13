import { ctrlWrapper } from '../../helpers/index.js';
import getAllBooks from './getAllBooks.js';
import getBookById from './getBookById.js';
import createBook from './createBook.js';
import deleteBookById from './deleteBookById.js';

export default {
  getAllBooks: ctrlWrapper(getAllBooks),
  getBookById: ctrlWrapper(getBookById),
  createBook: ctrlWrapper(createBook),
  deleteBookById: ctrlWrapper(deleteBookById),
};
