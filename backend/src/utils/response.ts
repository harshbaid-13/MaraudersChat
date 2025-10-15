import { Response } from 'express';
import { ApiResponse } from '../types/response';

export const successResponse = <T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200
): Response<ApiResponse<T>> => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        statusCode,
        timestamp: new Date().toISOString(),
    });
};

export const errorResponse = (
    res: Response,
    message: string = 'Error',
    statusCode: number = 500,
    error?: string
): Response<ApiResponse> => {
    return res.status(statusCode).json({
        success: false,
        message,
        error,
        statusCode,
        timestamp: new Date().toISOString(),
    });
};

export const paginatedResponse = <T>(
    res: Response,
    items: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Success'
) => {
    return res.status(200).json({
        success: true,
        message,
        data: {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
        statusCode: 200,
        timestamp: new Date().toISOString(),
    });
};