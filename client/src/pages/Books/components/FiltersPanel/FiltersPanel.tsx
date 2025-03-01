import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DEFAULTS, QUERY_PARAMS, SORT_OPTIONS, PRICE_FILTERS } from '../../../../constants';
import { QueryParamsType } from '../../../../types/books';

const FiltersPanel = () => {
  const { BOOK_TITLE, SORT_BY, PRICE_RANGE, PAGE } = QUERY_PARAMS;
  const { POPULARITY, PRICE_ASC, PRICE_DESC } = SORT_OPTIONS;
  const { ANY, UP_TO_15, FROM_15_TO_30, ABOVE_30 } = PRICE_FILTERS;
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

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id={SORT_BY}>Sort by</InputLabel>
        <Select labelId={SORT_BY} value={sortBy} label='Sort by' onChange={onSortChange}>
          <MenuItem value={POPULARITY}>popularity</MenuItem>
          <MenuItem value={PRICE_ASC}>price in ascending order</MenuItem>
          <MenuItem value={PRICE_DESC}>price in descending order</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id={PRICE_RANGE}>Filter by</InputLabel>
        <Select
          labelId={PRICE_RANGE}
          value={priceRange}
          label='Filter by'
          onChange={onFilterChange}
        >
          <MenuItem value={ANY}>any price</MenuItem>
          <MenuItem value={UP_TO_15}>price up to $15</MenuItem>
          <MenuItem value={FROM_15_TO_30}>price between $15 and $30</MenuItem>
          <MenuItem value={ABOVE_30}>price above $30</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FiltersPanel;
