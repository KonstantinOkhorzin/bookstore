import fs from 'fs/promises';

import { nanoid } from 'nanoid';

import cloudinary from '../config.js';
import getFileNameFromPath from './getFileNameFromPath.js';

const saveFileToCloudinary = async ({ path, folder, width, height, crop = 'fill' }) => {
  const fileName = getFileNameFromPath(path);
  const publicId = fileName + '_' + nanoid();
  const cloudinaryFilePath = `${folder}/${publicId}`;

  try {
    const result = await cloudinary.uploader.upload(path, {
      folder,
      public_id: publicId,
      transformation: { width, height, crop },
    });

    await fs.unlink(path);

    return { url: result.url, cloudinaryFilePath };
  } catch {
    throw new Error('Failed to upload file to Cloudinary');
  }
};

export default saveFileToCloudinary;
