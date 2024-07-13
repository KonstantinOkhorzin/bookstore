import Book from '../../models/book.js';
import { blackList } from './сonfig.js';

const getAllBooks = async (req, res) => {
  const books = await Book.find({}, blackList);
  res.json(books);
};

export default getAllBooks;
