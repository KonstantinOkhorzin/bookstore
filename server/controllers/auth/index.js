import { ctrlWrapper } from '../../helpers/index.js';
import register from './register.js';
import login from './login.js';
import getCurrent from './getCurrent.js';
import logout from './logout.js';
import updateAvatar from './updateAvatar.js';

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
