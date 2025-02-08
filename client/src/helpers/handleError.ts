import { SerializedError } from '@reduxjs/toolkit';
import type { IAxiosBaseQueryError } from '../types';

const handleError = (error: IAxiosBaseQueryError | SerializedError): string => {
  if ('status' in error) {
    return typeof error.data === 'string' ? error.data : 'Unknown server error';
  }

  if ('message' in error) {
    return error.message ?? 'An unexpected error occurred';
  }

  return 'An unknown error occurred';
};

export default handleError;
