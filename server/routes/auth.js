import express from 'express';

import authControllers from '../controllers/auth.js';
import { registerSchema } from '../schemas/auth.js';
import { validateBody, uploadFile } from '../middlewares/index.js';

const router = express.Router();

router.post(
  '/register',
  uploadFile.single('avatar'),
  validateBody(registerSchema),
  authControllers.register
);

export default router;
