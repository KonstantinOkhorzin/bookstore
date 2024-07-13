import Book from '../../models/book.js';

const getAllBooks = async (req, res) => {
  const books = await Book.find({}, '-createdAt -updatedAt -cloudinaryImagePath');
  res.json(books);
};

export default getAllBooks;
