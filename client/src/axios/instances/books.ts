import axios from 'axios';

const booksInstance = axios.create({
  baseURL: import.meta.env.VITE_BOOKS_BASE_URL,
});

booksInstance.interceptors.request.use(config => {
  const token: string | null = window.localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

export default booksInstance;
