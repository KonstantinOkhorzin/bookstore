import { useParams } from 'react-router-dom';

import { useGetBookByIdQuery } from '../../redux/apis/books';
import DetailsBook from './components/DetailsBook';
import { ErrorMessage, Spinner } from '../../components';

const SingleBook = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetBookByIdQuery(id ?? '', {
    skip: !id,
  });

  return (
    <>
      {isFetching && <Spinner />}

      {data && <DetailsBook book={data} />}

      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default SingleBook;
