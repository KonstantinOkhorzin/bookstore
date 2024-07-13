import { ctrlWrapper } from '../../helpers/index.js';
import register from './register.js';
import login from './login.js';
import getCurrentUser from './getCurrentUser.js';
import logout from './logout.js';
import updateAvatar from './updateAvatar.js';

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
