import { createApi } from '@reduxjs/toolkit/query/react';

import booksInstance from '../../axios/instances/books';
import { BOOKS_API_ENDPOINTS, HTTP_METHODS, TAG_TYPES, TAG_IDS } from '../../constants';
import { IBook, IBooksParams, IBooksResponse, ICreateBookRequest } from '../../types/books';
import { axiosBaseQuery, createFormData } from '../helpers';

const {
  BOOKS: { GET_ALL, GET_BY_ID, CREATE, DELETE_BY_ID },
} = BOOKS_API_ENDPOINTS;
const { GET, POST, DELETE } = HTTP_METHODS;
const { BOOKS } = TAG_TYPES;
const { LIST } = TAG_IDS;

const booksAPI = createApi({
  reducerPath: 'booksAPI',
  baseQuery: axiosBaseQuery(booksInstance),
  tagTypes: [BOOKS],
  endpoints: builder => ({
    getBooks: builder.query<IBooksResponse, IBooksParams>({
      query: params => ({ url: GET_ALL, method: GET, params }),
      providesTags: result =>
        result
          ? [...result.books.map(({ _id: id }) => ({ type: BOOKS, id })), { type: BOOKS, id: LIST }]
          : [{ type: BOOKS, id: LIST }],
    }),
    getBookById: builder.query<IBook, string>({
      query: id => ({ url: GET_BY_ID(id), method: GET }),
      providesTags: (_result, _error, arg) => [{ type: BOOKS, id: arg }],
    }),
    createBook: builder.mutation<IBook, ICreateBookRequest>({
      query: data => {
        return { url: CREATE, method: POST, data: createFormData(data) };
      },
      invalidatesTags: [{ type: BOOKS, id: LIST }],
    }),
    deleteBookById: builder.mutation<void, string>({
      query: id => ({
        url: DELETE_BY_ID(id),
        method: DELETE,
      }),
      invalidatesTags: [{ type: BOOKS, id: LIST }],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useDeleteBookByIdMutation,
} = booksAPI;

export default booksAPI;
