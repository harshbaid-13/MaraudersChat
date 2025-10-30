import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { successResponse, errorResponse } from '../utils/response';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, fullName } = req.body;

        const result = await authService.registerUser({
            username,
            email,
            password,
            fullName,
        });

        successResponse(res, result, 'Registration successful', 201);
    } catch (error: any) {
        errorResponse(res, error.message, 400);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { login, password } = req.body;

        const result = await authService.loginUser(login, password);

        successResponse(res, result, 'Login successful', 200);
    } catch (error: any) {
        errorResponse(res, error.message, 401);
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return errorResponse(res, 'Refresh token required', 400);
        }

        const result = await authService.refreshAccessToken(refreshToken);

        successResponse(res, result, 'Token refreshed', 200);
    } catch {
        errorResponse(res, 'Invalid refresh token', 401);
    }
};