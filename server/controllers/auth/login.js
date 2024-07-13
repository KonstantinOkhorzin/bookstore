import bcrypt from 'bcryptjs';

import { HttpError, createJWToken } from '../../helpers/index.js';
import User from '../../models/user.js';

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

export default login;
