import { FC } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { IBook } from '../../../../../../types/books';
import { ROUTES } from '../../../../../../constants';

interface IProps {
  book: IBook;
}

const BookCard: FC<IProps> = ({ book }) => {
  const location = useLocation();

  return (
    <Card>
      <CardActionArea
        component={Link}
        to={`${ROUTES.BOOKS}/${book._id}`}
        state={{ from: location }}
      >
        <CardMedia component='img' height='140' image={book.image} alt={book.title} />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography
            gutterBottom
            variant='h5'
            component='h3'
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden',
            }}
          >
            {book.title}
          </Typography>
          <Typography
            variant='subtitle1'
            component='p'
            sx={{
              color: 'text.secondary',
              fontWeight: 'bold',
              fontStyle: 'italic',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden',
            }}
          >
            {book.author}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: 'text.secondary',
              minHeight: '60px',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
            }}
          >
            {book.shortDescription}
          </Typography>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            ${book.price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;
