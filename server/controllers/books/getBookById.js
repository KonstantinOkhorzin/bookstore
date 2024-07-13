import Book from '../../models/book.js';
import { blackList } from './сonfig.js';

const getBookById = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id, blackList);

  if (!book) {
    throw HttpError(404);
  }

  res.json(book);
};

export default getBookById;
