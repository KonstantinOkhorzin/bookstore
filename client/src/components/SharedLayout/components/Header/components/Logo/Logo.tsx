import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

import BooksLogo from '../../../../../../assets/icons/books.svg?react';
import { ROUTES } from '../../../../../../constants';

const Logo = () => {
  return (
    <IconButton component={Link} to={ROUTES.HOME}>
      <BooksLogo width={60} height={60} />
    </IconButton>
  );
};

export default Logo;
