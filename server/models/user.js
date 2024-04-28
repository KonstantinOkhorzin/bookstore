import { model } from 'mongoose';

import { handleMongooseError } from '../helpers/index.js';
import { userSchema } from '../schemas/auth.js';

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

export default User;
