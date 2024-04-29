import mongoose from 'mongoose';

import app from './app.js';

const { PORT, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
