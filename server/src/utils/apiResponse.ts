import { Response } from 'express';
import { IApiResponse } from '../../../shared/types/index.js';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message: string = 'Success',
) => {
  const response: IApiResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  statusCode: number,
  error: string,
  code: string,
) => {
  const response = {
    success: false,
    error,
    code,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(response);
};
