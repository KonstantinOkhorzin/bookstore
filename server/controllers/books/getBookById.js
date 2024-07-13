import Book from '../../models/book.js';

const getBookById = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    throw HttpError(404);
  }

  res.json(book);
};

export default getBookById;
