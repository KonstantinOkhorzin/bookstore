import cloudinary from '../config.js';

const deleteFileFromCloudinary = async path => {
  try {
    await cloudinary.uploader.destroy(path);
  } catch (error) {
    throw new Error('Failed to delete file from Cloudinary');
  }
};

export default deleteFileFromCloudinary;
