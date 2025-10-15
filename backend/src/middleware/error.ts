import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    errorResponse(res, message, statusCode, err);
};

export const notFound = (req: Request, res: Response) => {
    errorResponse(res, 'Route not found', 404);
};