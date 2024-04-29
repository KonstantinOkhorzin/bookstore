import path from 'path';

import multer from 'multer';

import { HttpError } from '../helpers/index.js';

const __dirname = import.meta.dirname;
const tmpDir = path.join(__dirname, '../', 'tmp');
const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const maxSize = 1 * 1024 * 1024;

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: tmpDir,
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(HttpError(400, 'Avatar format is not allowed'));
    }

    cb(null, true);
  },
  limits: {
    fileSize: maxSize,
  },
});

export default uploadFile;
