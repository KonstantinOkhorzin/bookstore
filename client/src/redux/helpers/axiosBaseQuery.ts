import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import type { IErrorResponse, IAxiosBaseQueryError } from '../../types';

const axiosBaseQuery =
  (
    axiosInstance: AxiosInstance
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    IAxiosBaseQueryError
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: axiosInstance.defaults.baseURL + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError<IErrorResponse>;
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data?.message ?? error.message,
        },
      };
    }
  };

export default axiosBaseQuery;
