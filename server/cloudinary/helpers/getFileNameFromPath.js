const getFileNameFromPath = filePath => {
  return filePath
    .split('/')
    .pop()
    .replace(/\.[^/.]+$/, '');
};

export default getFileNameFromPath;
