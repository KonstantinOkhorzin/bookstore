import { Box, TextField, SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DEFAULTS, QUERY_PARAMS, SORT_OPTIONS, PRICE_FILTERS } from '../../../../constants';
import { QueryParamsType } from '../../../../types/books';
import OptionSelect from './components/OptionSelect';

const FiltersPanel = () => {
  const { BOOK_TITLE, SORT_BY, PRICE_RANGE, PAGE } = QUERY_PARAMS;
  const [searchParams, setSearchParams] = useSearchParams();
  const bookTitle = searchParams.get(BOOK_TITLE) ?? '';
  const sortBy = searchParams.get(SORT_BY) ?? '';
  const priceRange = searchParams.get(PRICE_RANGE) ?? '';

  const updateQueryParam = (value: string, param: QueryParamsType) => {
    const params = Object.fromEntries([...searchParams]);

    if (value === '') {
      delete params[param];
    } else {
      params[param] = value;
    }
    params[PAGE] = DEFAULTS.INITIAL_PAGE.toString();

    setSearchParams(params);
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateQueryParam(e.target.value, BOOK_TITLE);
  };

  const onSortChange = (e: SelectChangeEvent) => {
    updateQueryParam(e.target.value, SORT_BY);
  };

  const onFilterChange = (e: SelectChangeEvent) => {
    updateQueryParam(e.target.value, PRICE_RANGE);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '1fr auto auto' },
        gap: 2,
      }}
    >
      <TextField
        label='🔍 Search book by title'
        onChange={onSearchChange}
        value={bookTitle}
        sx={{ minWidth: 210 }}
      />

      <OptionSelect
        id={SORT_BY}
        label='Sort by'
        value={sortBy}
        onChange={onSortChange}
        options={SORT_OPTIONS}
      />

      <OptionSelect
        id={PRICE_RANGE}
        label='Filter by'
        value={priceRange}
        onChange={onFilterChange}
        options={PRICE_FILTERS}
      />
    </Box>
  );
};

export default FiltersPanel;
