import { HttpError } from '../helpers/index.js';

const isAdmin = (req, _, next) => {
  const { role } = req.user;

  if (role !== 'admin') {
    next(HttpError(403));
  }

  next();
};

export default isAdmin;
