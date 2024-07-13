import { saveFileToCloudinary, deleteFileFromCloudinary } from '../../cloudinary/helpers/index.js';
import User from '../../models/user.js';
import { avatarConfig } from './config.js';

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

export default updateAvatar;
