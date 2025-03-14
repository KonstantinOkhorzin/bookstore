export const DEFAULTS = {
  BOOKS_LIMIT: 6,
  INITIAL_PAGE: 1,
} as const;

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
} as const;

export const TAG_TYPES = {
  BOOKS: 'Books',
} as const;

export const TAG_IDS = {
  LIST: 'LIST',
} as const;

export const QUERY_PARAMS = {
  BOOK_TITLE: 'bookTitle',
  SORT_BY: 'sortBy',
  PRICE_RANGE: 'priceRange',
  PAGE: 'page',
} as const;

export const SORT_OPTIONS = [
  { value: '', label: 'popularity' },
  { value: 'price', label: 'price in ascending order' },
  { value: '-price', label: 'price in descending order' },
] as const;

export const PRICE_FILTERS = [
  { value: 'any', label: 'any price' },
  { value: 'up_to_15', label: 'price up to $15' },
  { value: '15_to_30', label: 'price between $15 and $30' },
  { value: '30_plus', label: 'price above $30' },
] as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;
