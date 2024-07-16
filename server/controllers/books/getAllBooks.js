import Book from '../../models/book.js';
import { blackList } from './сonfig.js';

const getAllBooks = async (req, res) => {
  const { page = 1, limit = 8, bookTitle = '', priceRange = 'any', sortBy = '' } = req.query;
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const searchQuery = bookTitle ? { title: new RegExp(bookTitle, 'i') } : {};

  switch (priceRange) {
    case 'up_to_15':
      searchQuery.price = { $lte: 15 };
      break;
    case '15_to_30':
      searchQuery.price = { $gte: 15, $lte: 30 };
      break;
    case '30_plus':
      searchQuery.price = { $gte: 30 };
      break;
    case 'any':
    default:
      break;
  }

  const sortOptions = {};
  if (sortBy === 'price') {
    sortOptions.price = 1;
  } else if (sortBy === '-price') {
    sortOptions.price = -1;
  }

  const skip = (parsedPage - 1) * parsedLimit;
  const totalBooks = await Book.countDocuments(searchQuery);
  const books = await Book.find(searchQuery, blackList, {
    skip,
    limit: parsedLimit,
  }).sort(sortOptions);

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
