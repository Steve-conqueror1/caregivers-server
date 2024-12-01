import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { NODE_ENV } from '../constants';
import { CustomError } from '../types';

export const errorHandler: ErrorRequestHandler = async (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFoundHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    'The requested api endpoint does not exist',
    404
  );

  next(error);
};
