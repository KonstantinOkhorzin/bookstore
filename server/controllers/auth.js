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

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Wrong email or password');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Wrong email or password');
  }

  const token = createJWToken(user);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    user: {
      email: user.email,
      name: user.name,
      avatarURL: user.avatarURL,
      role: user.role,
    },
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  res.json({
    email: user.email,
    name: user.name,
    avatarURL: user.avatarURL,
    role: user.role,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).send();
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
