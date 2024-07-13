import express from 'express';

import authController from '../controllers/auth/index.js';
import { registerSchema, loginSchema } from '../schemas/auth.js';
import { validateBody, uploadFile, authenticate } from '../middlewares/index.js';

const router = express.Router();

router.post(
  '/register',
  uploadFile.single('avatar'),
  validateBody(registerSchema),
  authController.register
);

router.post('/login', validateBody(loginSchema), authController.login);

router.get('/current', authenticate, authController.getCurrentUser);

router.post('/logout', authenticate, authController.logout);

router.patch('/avatars', authenticate, uploadFile.single('avatar'), authController.updateAvatar);

export default router;
