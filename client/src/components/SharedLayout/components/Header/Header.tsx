import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Favorite, AccountCircle } from '@mui/icons-material';
import { AppBar, Box, Toolbar, IconButton, Badge, Avatar, Tooltip } from '@mui/material';

import { DEFAULTS, ROUTES } from '../../../../constants';
import { UserMenu, Logo } from './components';
import { useAuth } from '../../../../hooks';

const { FAVORITES, CART, SIGN_IN } = ROUTES;

function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { isLoggedIn, user } = useAuth();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar sx={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size='large'
                aria-label='show favorite books'
                color='inherit'
                component={Link}
                to={FAVORITES}
              >
                <Badge badgeContent={0} color='error'>
                  <Favorite />
                </Badge>
              </IconButton>
              <IconButton
                size='large'
                aria-label='show books in cart'
                color='inherit'
                component={Link}
                to={CART}
              >
                <Badge badgeContent={0} color='error'>
                  <ShoppingBag />
                </Badge>
              </IconButton>
              <Box sx={{ ml: '.5rem' }}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt='user avatar' src={user?.avatarURL ? user.avatarURL : DEFAULTS.AVATAR} />
                  </IconButton>
                </Tooltip>
              </Box>
              <UserMenu anchorElUser={anchorElUser} closeUserMenu={closeUserMenu} />
            </Box>
          ) : (
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              color='inherit'
              component={Link}
              to={SIGN_IN}
            >
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
