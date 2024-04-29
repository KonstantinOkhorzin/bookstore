import bcrypt from 'bcryptjs';

import { HttpError, ctrlWrapper, createJWToken, saveFileToCloudinary } from '../helpers/index.js';
import User from '../models/user.js';

const avatarConfig = {
  folder: 'avatars',
  width: 200,
  height: 200,
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const avatarURL = req.file?.path
    ? await saveFileToCloudinary({
        path: req.file.path,
        ...avatarConfig,
      })
    : process.env.DEFAULT_AVATAR;

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

  const token = createJWToken(newUser);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      avatarURL: newUser.avatarURL,
      role: newUser.role,
    },
    token,
  });
};

export default {
  register: ctrlWrapper(register),
};
