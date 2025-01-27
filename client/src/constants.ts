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

export const BOOKS_API_ENDPOINTS = {
  USERS: {
    SIGN_UP: 'users/register',
    SIGN_IN: 'users/login',
    SIGN_OUT: 'users/logout',
    CURRENT: 'users/current',
    AVATARS: 'users/avatars',
  },
  BOOKS: {
    GET_ALL: 'books',
    GET_BY_ID: (id: string) => `books/${id}`,
    CREATE: '/api/books',
    DELETE_BY_ID: (id: string) => `books/${id}`,
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
