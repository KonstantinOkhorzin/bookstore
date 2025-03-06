import { ChangeEvent, useMemo } from 'react';
import { Pagination, Box, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { useGetBooksQuery } from '../../redux/apis/books';
import { DEFAULTS, QUERY_PARAMS } from '../../constants';
import { FiltersPanel, BookList } from './components';
import { ErrorMessage, Spinner } from '../../components';

const Books = () => {
  const { BOOKS_LIMIT, INITIAL_PAGE } = DEFAULTS;
  const { PAGE } = QUERY_PARAMS;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get(PAGE) ?? INITIAL_PAGE);
  const params = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
  const { data, error, isFetching, isSuccess } = useGetBooksQuery({
    limit: BOOKS_LIMIT,
    page: currentPage,
    ...params,
  });

  const onPaginationChange = (_: ChangeEvent<unknown>, page: number) => {
    const params = Object.fromEntries([...searchParams]);
    params[PAGE] = page.toString();

    setSearchParams(params);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {isSuccess && <FiltersPanel />}

      {isFetching && <Spinner />}

      {error && <ErrorMessage error={error} />}

      {data && !isFetching && (
        <>
          {data.books.length > 0 ? (
            <BookList bookList={data.books} />
          ) : (
            <Typography variant='h6' component='p' textAlign='center' color='warning'>
              Books not found! Please try again with different criteria.
            </Typography>
          )}

          {data && data.totalBooks > BOOKS_LIMIT && (
            <Pagination
              count={data.totalPages}
              page={currentPage}
              onChange={onPaginationChange}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Books;
