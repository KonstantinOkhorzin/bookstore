import { SerializedError } from '@reduxjs/toolkit';

export interface IErrorResponse {
  message: string;
}

export interface IAxiosBaseQueryError {
  status?: number;
  data: string;
}

export type IError = IAxiosBaseQueryError | SerializedError;
