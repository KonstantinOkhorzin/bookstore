import { configureStore } from '@reduxjs/toolkit';

import { authAPI, booksAPI } from './apis';
import { authSlice, booksSlice } from './slices';

const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [booksAPI.reducerPath]: booksAPI.reducer,
    auth: authSlice,
    books: booksSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authAPI.middleware, booksAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
