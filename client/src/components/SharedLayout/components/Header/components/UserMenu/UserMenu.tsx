import { Menu, MenuItem, Typography } from '@mui/material';
import { FC } from 'react';

import { useAppDispatch } from '../../../../../../hooks';
import { useSignOutMutation } from '../../../../../../redux/apis/auth';
import { clearUserData } from '../../../../../../redux/slices/auth';

interface IProps {
  anchorElUser: HTMLElement | null;
  closeUserMenu: () => void;
}

const UserMenu: FC<IProps> = ({ anchorElUser, closeUserMenu }) => {
  const dispatch = useAppDispatch();
  const [logOut] = useSignOutMutation();

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
      <MenuItem onClick={onSignOutClick}>
        <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
