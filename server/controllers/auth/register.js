import bcrypt from 'bcryptjs';

import { HttpError, createJWToken } from '../../helpers/index.js';
import { saveFileToCloudinary, getFileNameFromPath } from '../../cloudinary/helpers/index.js';
import User from '../../models/user.js';
import avatarConfig from './avatarConfig.js';

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

export default register;
