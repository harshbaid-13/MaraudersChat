import jwt, { SignOptions } from 'jsonwebtoken';

interface TokenPayload {
    userId: string;
    email: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRE || '15m') as SignOptions['expiresIn'],
    };
    return jwt.sign(payload, process.env.JWT_SECRET!, options);
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    const options: SignOptions = {
        expiresIn: (process.env.JWT_REFRESH_EXPIRE || '7d') as SignOptions['expiresIn'],
    };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, options);
};

export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as TokenPayload;
};