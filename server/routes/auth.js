import express from 'express';

import authControllers from '../controllers/auth.js';
import { registerSchema, loginSchema } from '../schemas/auth.js';
import { validateBody, uploadFile, authenticate } from '../middlewares/index.js';

const router = express.Router();

router.post(
  '/register',
  uploadFile.single('avatar'),
  validateBody(registerSchema),
  authControllers.register
);

router.post('/login', validateBody(loginSchema), authControllers.login);

router.get('/current', authenticate, authControllers.getCurrent);

router.post('/logout', authenticate, authControllers.logout);

export default router;
