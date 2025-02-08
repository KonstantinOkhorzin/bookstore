export interface IErrorResponse {
  message: string;
}

export interface IAxiosBaseQueryError {
  status?: number;
  data: string;
}
