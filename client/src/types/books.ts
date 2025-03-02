import { SORT_OPTIONS, PRICE_FILTERS, QUERY_PARAMS } from '../constants';

interface IBaseBook {
  title: string;
  author: string;
  price: number;
  description: string;
  level: string;
  tags: string[];
  amount: number;
  shortDescription: string;
}

export interface IBook extends IBaseBook {
  _id: string;
  image: string;
}

export interface ICreateBookRequest extends IBaseBook {
  image: File;
}

export interface IBooksResponse {
  books: IBook[];
  totalBooks: number;
  limit: number;
  page: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export type SortByType = (typeof SORT_OPTIONS)[number]['value'];
export type PriceRangeType = (typeof PRICE_FILTERS)[number]['value'];
export type QueryParamsType = (typeof QUERY_PARAMS)[keyof typeof QUERY_PARAMS];

export interface IBooksParams {
  page?: number;
  limit?: number;
  bookTitle?: string;
  priceRange?: PriceRangeType;
  sortBy?: SortByType;
}
