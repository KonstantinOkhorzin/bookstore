import { deleteFileFromCloudinary } from '../../cloudinary/helpers/index.js';
import Book from '../../models/book.js';

const deleteBookById = async (req, res) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndDelete(id);

  if (!deletedBook) {
    throw HttpError(404);
  }

  await deleteFileFromCloudinary(deletedBook.cloudinaryImagePath);

  res.status(204).send();
};

export default deleteBookById;
