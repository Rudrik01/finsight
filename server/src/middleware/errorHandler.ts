import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export const errorHandler = (err: Error & { status?: number; code?: string }, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error]:', err.message || err);
  const statusCode = err.status || 500;
  const message = statusCode === 500 ? 'Something went wrong. Please try again.' : err.message || 'Internal Server Error';
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  sendError(res, statusCode, message, code);
};
