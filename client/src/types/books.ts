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
