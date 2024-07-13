import { saveFileToCloudinary } from '../../cloudinary/helpers/index.js';
import Book from '../../models/book.js';
import bookImageConfig from './bookImageConfig.js';

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

export default createBook;
