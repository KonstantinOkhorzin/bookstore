import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery, createFormData } from '../helpers';
import booksInstance from '../../axios/instances/books';
import { BOOKS_API_ENDPOINTS, HTTP_METHODS } from '../../constants';
import {
  IAuthRequest,
  IRegisterRequest,
  IUpdateAvatarRequest,
  IUpdateAvatarResponse,
  IUser,
  IUserAuthResponse,
} from '../../types/auth';

const {
  USERS: { SIGN_UP, SIGN_IN, SIGN_OUT, AVATARS, CURRENT },
} = BOOKS_API_ENDPOINTS;
const { GET, POST, PATCH } = HTTP_METHODS;

const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: axiosBaseQuery(booksInstance),
  endpoints: builder => ({
    signUp: builder.mutation<IUserAuthResponse, IRegisterRequest>({
      query: data => ({
        url: SIGN_UP,
        method: POST,
        data: createFormData(data),
      }),
    }),
    signIn: builder.mutation<IUserAuthResponse, IAuthRequest>({
      query: userData => ({
        url: SIGN_IN,
        method: POST,
        data: userData,
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: SIGN_OUT,
        method: POST,
      }),
    }),
    refreshUser: builder.query<IUser, void>({
      query: () => ({
        url: CURRENT,
        method: GET,
      }),
    }),
    updateAvatar: builder.mutation<IUpdateAvatarResponse, IUpdateAvatarRequest>({
      query: avatar => ({
        url: AVATARS,
        method: PATCH,
        data: createFormData(avatar),
      }),
    }),
  }),
});

export const {
  useRefreshUserQuery,
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useUpdateAvatarMutation,
} = authAPI;

export default authAPI;
