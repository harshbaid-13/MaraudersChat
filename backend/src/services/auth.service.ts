import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

export const registerUser = async (data: {
    username: string;
    email: string;
    password: string;
    fullName?: string;
}) => {
    // Check if user exists
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ email: data.email }, { username: data.username }],
        },
    });

    if (existingUser) {
        if (existingUser.email === data.email) {
            throw new Error('Email already registered');
        }
        if (existingUser.username === data.username) {
            throw new Error('Username already taken');
        }
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            passwordHash,
            fullName: data.fullName,
        },
        select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
            createdAt: true,
        },
    });

    // Generate tokens
    const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
    });
    const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
    });

    return { user, accessToken, refreshToken };
};

export const loginUser = async (login: string, password: string) => {
    // Find user by email or username
    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email: login }, { username: login }],
        },
    });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.passwordHash);

    if (!isValidPassword) {
        throw new Error('Invalid credentials');
    }

    // Check if account is active
    if (!user.isActive) {
        throw new Error('Account is deactivated');
    }

    // Generate tokens
    const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
    });
    const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
    });

    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
        },
        accessToken,
        refreshToken,
    };
};

export const refreshAccessToken = async (refreshToken: string) => {
    const { verifyRefreshToken } = await import('../utils/jwt');

    const payload = verifyRefreshToken(refreshToken);

    // Verify user still exists
    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
    });

    if (!user || !user.isActive) {
        throw new Error('Invalid refresh token');
    }

    // Generate new access token
    const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
    });

    return { accessToken };
};