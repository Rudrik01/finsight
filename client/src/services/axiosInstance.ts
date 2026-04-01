import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../constants/config';
import type { IApiError } from '@/types';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class AppError extends Error {
  code: string;
  constructor(message: string, code: string = 'UNKNOWN_ERROR') {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Return wrapped data directly
    return response.data;
  },
  (error: AxiosError<IApiError>) => {
    if (!error.response) {
      throw new AppError('Unable to connect to the server. Please check your network connection.', 'NETWORK_ERROR');
    }

    const { status, data } = error.response;
    
    if (status >= 500) {
      throw new AppError('Something went wrong. Please try again.', 'SERVER_ERROR');
    }
    
    if (data && data.error) {
      throw new AppError(data.error, data.code);
    }
    
    throw new AppError('An unexpected error occurred.', 'UNKNOWN_ERROR');
  }
);
