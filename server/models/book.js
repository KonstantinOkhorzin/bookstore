import { model } from 'mongoose';

import { handleMongooseError } from '../helpers/index.js';
import { bookSchema } from '../schemas/book.js';

bookSchema.post('save', handleMongooseError);

const Book = model('book', bookSchema);

export default Book;
