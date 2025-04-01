import { Menu, MenuItem, Typography } from '@mui/material';
import { FC } from 'react';

import { useAppDispatch, useAuth } from '../../../../../../hooks';
import { useSignOutMutation } from '../../../../../../redux/apis/auth';
import { clearUserData } from '../../../../../../redux/slices/auth';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../../../constants';

interface IProps {
  anchorElUser: HTMLElement | null;
  closeUserMenu: () => void;
}

const UserMenu: FC<IProps> = ({ anchorElUser, closeUserMenu }) => {
  const dispatch = useAppDispatch();
  const [logOut] = useSignOutMutation();
  const { isAdmin } = useAuth();

  const onSignOutClick = () => {
    logOut()
      .unwrap()
      .then(() => {
        dispatch(clearUserData());
        window.localStorage.removeItem('token');
      });
  };

  return (
    <Menu
      sx={{ mt: '45px' }}
      id='menu-appbar'
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={closeUserMenu}
    >
      {isAdmin && (
        <MenuItem>
          <Typography
            onClick={closeUserMenu}
            component={Link}
            to={ROUTES.ADMIN_DASHBOARD}
            sx={{ textAlign: 'center', color: 'currentcolor' }}
          >
            Admin Dashboard
          </Typography>
        </MenuItem>
      )}

      <MenuItem onClick={onSignOutClick}>
        <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
