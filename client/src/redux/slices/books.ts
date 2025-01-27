import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBook } from '../../types/books';

interface InitialState {
  bookList: IBook[];
}

const initialState: InitialState = {
  bookList: [],
};

const slice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setDataBooks: (state, action: PayloadAction<IBook[]>) => {
      state.bookList.push(...action.payload);
    },
  },
  selectors: {
    selectBookList: state => state.bookList,
  },
});

export const { setDataBooks } = slice.actions;
export const { selectBookList } = slice.selectors;

export default slice.reducer;
