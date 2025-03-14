import { FC } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

import { IBook } from '../../../../types/books';
import { ROUTES } from '../../../../constants';

interface IProps {
  book: IBook;
}

const DetailsBook: FC<IProps> = ({ book }) => {
  const location = useLocation();
  const backLinkLocation = location.state?.from ?? ROUTES.HOME;
  const { image, title, author, description, tags, price, amount } = book;

  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '300px 1fr' } }}>
      <Box>
        <img src={image} alt={title} style={{ minWidth: '100%' }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant='h4' component='h1' gutterBottom>
            {title}
          </Typography>
          <Typography variant='h6' component='p' color='text.secondary'>
            by {author}
          </Typography>
        </Box>

        <Typography variant='body1'>{description}</Typography>

        {tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tags.map(tag => (
              <Chip key={tag} label={tag} color='primary' variant='outlined' />
            ))}
          </Box>
        )}

        <Box>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            ${price}
          </Typography>
          <Typography variant='body2' color={amount > 0 ? 'green' : 'red'}>
            {amount > 0 ? 'In Stock' : 'Out of Stock'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Button component={Link} to={backLinkLocation} variant='text' startIcon={<ArrowBack />}>
            Back to books
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsBook;
