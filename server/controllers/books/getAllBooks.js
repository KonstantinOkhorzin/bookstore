import Book from '../../models/book.js';
import { blackList } from './сonfig.js';

const getAllBooks = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  const skip = (parsedPage - 1) * parsedLimit;
  const totalBooks = await Book.countDocuments();
  const books = await Book.find({}, blackList, { skip, limit: parsedLimit });

  const totalPages = Math.ceil(totalBooks / parsedLimit);
  const hasPrevPage = parsedPage > 1;
  const hasNextPage = parsedPage < totalPages;
  const prevPage = hasPrevPage ? parsedPage - 1 : null;
  const nextPage = hasNextPage ? parsedPage + 1 : null;

  res.json({
    books,
    totalBooks,
    limit: parsedLimit,
    page: parsedPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  });
};

export default getAllBooks;
