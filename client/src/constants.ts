export const ROUTES = {
  HOME: '/',
  SIGN_IN: 'sign-in',
  SIGN_UP: 'sign-up',
  BOOKS: 'books',
  SINGLE_BOOK: 'books/:id',
  FAVORITES: 'favorites',
  CART: 'cart',
  NOT_FOUND: '*',
  ADMIN_DASHBOARD: '/admin',
};

const USERS_ENDPOINT = 'users';
const BOOKS_ENDPOINT = 'books';

export const BOOKS_API_ENDPOINTS = {
  USERS: {
    SIGN_UP: `${USERS_ENDPOINT}/register`,
    SIGN_IN: `${USERS_ENDPOINT}/login`,
    SIGN_OUT: `${USERS_ENDPOINT}/logout`,
    CURRENT: `${USERS_ENDPOINT}/current`,
    AVATARS: `${USERS_ENDPOINT}/avatars`,
  },
  BOOKS: {
    GET_ALL: BOOKS_ENDPOINT,
    GET_BY_ID: (id: string) => `${BOOKS_ENDPOINT}/${id}`,
    CREATE: BOOKS_ENDPOINT,
    DELETE_BY_ID: (id: string) => `${BOOKS_ENDPOINT}/${id}`,
  },
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH',
};

export const TAG_TYPES = {
  BOOKS: 'Books',
};

export const TAG_IDS = {
  LIST: 'LIST',
};
