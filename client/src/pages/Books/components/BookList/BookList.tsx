import { FC } from 'react';
import { List, ListItem } from '@mui/material';

import BookCard from './components/BookCard';
import { IBook } from '../../../../types/books';

interface IProps {
  bookList: IBook[];
}

const BookList: FC<IProps> = ({ bookList }) => {
  return (
    <List
      disablePadding
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(auto-fit, minmax(220px, 1fr))',
          sm: 'repeat(auto-fit, minmax(250px, 1fr))',
        },
        gap: { xs: 2, sm: 3 },
      }}
    >
      {bookList.map(book => (
        <ListItem key={book._id} disablePadding>
          <BookCard book={book} />
        </ListItem>
      ))}
    </List>
  );
};

export default BookList;
