import { model } from 'mongoose';

import { handleMongooseError } from '../helpers/index.js';
import { bookSchema } from '../schemas/auth.js';

userSchema.post('save', handleMongooseError);

const Book = model('book', bookSchema);

export default Book;
