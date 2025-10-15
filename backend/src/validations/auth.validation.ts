import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export const validateRegister = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, email, password, fullName } = req.body;

    // Username validation
    if (!username || username.length < 3 || username.length > 50) {
        return errorResponse(
            res,
            'Username must be between 3 and 50 characters',
            400
        );
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return errorResponse(
            res,
            'Username can only contain letters, numbers, and underscores',
            400
        );
    }

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return errorResponse(res, 'Invalid email address', 400);
    }

    // Password validation
    if (!password || password.length < 6) {
        return errorResponse(
            res,
            'Password must be at least 6 characters long',
            400
        );
    }

    // Full name validation (optional)
    if (fullName && fullName.length > 100) {
        return errorResponse(res, 'Full name is too long', 400);
    }

    next();
};

export const validateLogin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return errorResponse(res, 'Login and password are required', 400);
    }

    next();
};