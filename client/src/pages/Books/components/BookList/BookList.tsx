import { FC } from 'react';
import BookCard from './components/BookCard';
import { Grid2 } from '@mui/material';
import { IBook } from '../../../../types/books';

interface IProps {
  bookList: IBook[];
}

const BookList: FC<IProps> = ({ bookList }) => {
  return (
    <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 6 }} component='ul'>
      {bookList.map(book => (
        <Grid2 key={book._id} size={2} component='li'>
          <BookCard book={book} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default BookList;
