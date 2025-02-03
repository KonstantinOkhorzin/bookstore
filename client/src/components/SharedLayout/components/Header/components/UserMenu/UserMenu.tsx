import { Menu, MenuItem, Typography } from '@mui/material';
import { FC } from 'react';

interface IProps {
  anchorElUser: HTMLElement | null;
  closeUserMenu: () => void;
}

const UserMenu: FC<IProps> = ({ anchorElUser, closeUserMenu }) => {
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
      <MenuItem onClick={closeUserMenu}>
        <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
