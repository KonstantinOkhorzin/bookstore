import bcrypt from 'bcryptjs';

import { HttpError, ctrlWrapper, createJWToken } from '../helpers/index.js';
import {
  saveFileToCloudinary,
  deleteFileFromCloudinary,
  getFileNameFromPath,
} from '../cloudinary/helpers/index.js';
import User from '../models/user.js';

const avatarConfig = {
  folder: 'avatars',
  width: 200,
  height: 200,
};

const register = async (req, res) => {
  const { DEFAULT_AVATAR } = process.env;
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  let avatarURL;
  let cloudinaryAvatarPath;

  if (req.file?.path) {
    const { url, cloudinaryFilePath } = await saveFileToCloudinary({
      path: req.file.path,
      ...avatarConfig,
    });
    avatarURL = url;
    cloudinaryAvatarPath = cloudinaryFilePath;
  } else {
    avatarURL = DEFAULT_AVATAR;
    cloudinaryAvatarPath = `${avatarConfig.folder}/${getFileNameFromPath(DEFAULT_AVATAR)}`;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    cloudinaryAvatarPath,
  });

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

const updateAvatar = async (req, res) => {
  const { DEFAULT_AVATAR } = process.env;
  const { _id, avatarURL: prevAvatarURL, cloudinaryAvatarPath } = req.user;

  if (prevAvatarURL !== DEFAULT_AVATAR) {
    await deleteFileFromCloudinary(cloudinaryAvatarPath);
  }

  const { url: avatarURL, cloudinaryFilePath } = await saveFileToCloudinary({
    path: req.file.path,
    ...avatarConfig,
  });

  await User.findByIdAndUpdate(_id, { avatarURL, cloudinaryAvatarPath: cloudinaryFilePath });

  res.json({
    avatarURL,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
