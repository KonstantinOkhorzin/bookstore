import fs from 'fs/promises';

import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const saveFileToCloudinary = async ({ path, folder, width, height, id = '' }) => {
  const fileName = path
    .split('/')
    .pop()
    .replace(/\.[^/.]+$/, '');

  try {
    const result = await cloudinary.uploader.upload(path, {
      folder,
      public_id: fileName + '_' + id,
      transformation: { width, height, crop: 'fill' },
    });

    await fs.unlink(path);

    return result.url;
  } catch {
    throw new Error('Failed to upload file to Cloudinary');
  }
};

export default saveFileToCloudinary;
