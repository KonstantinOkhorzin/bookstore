import User from '../../models/user.js';

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

export default getCurrent;
