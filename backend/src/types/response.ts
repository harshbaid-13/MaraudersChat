export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    statusCode: number;
    timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<{
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}> {}