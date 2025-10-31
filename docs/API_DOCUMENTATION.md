# API Documentation

**Base URL:** `http://localhost:5000/api/v1`

All responses follow a standard format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
  timestamp: string;
}
```

---

## Authentication

### Register User

**POST** `/auth/register`

**Request Body:**
```json
{
  "username": "string (3-50 chars, required)",
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "fullName": "string (optional)"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "fullName": "string | null",
      "createdAt": "ISO timestamp"
    },
    "accessToken": "string",
    "refreshToken": "string"
  },
  "statusCode": 201,
  "timestamp": "ISO timestamp"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already exists",
  "statusCode": 400,
  "timestamp": "ISO timestamp"
}
```

---

### Login User

**POST** `/auth/login`

**Request Body:**
```json
{
  "login": "string (username or email, required)",
  "password": "string (required)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "fullName": "string | null",
      "isOnline": false,
      "lastSeen": "ISO timestamp"
    },
    "accessToken": "string",
    "refreshToken": "string"
  },
  "statusCode": 200,
  "timestamp": "ISO timestamp"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "timestamp": "ISO timestamp"
}
```

---

### Refresh Token

**POST** `/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "string (required)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "accessToken": "string",
    "refreshToken": "string"
  },
  "statusCode": 200,
  "timestamp": "ISO timestamp"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid refresh token",
  "statusCode": 401,
  "timestamp": "ISO timestamp"
}
```

---

## Error Codes

| Status | Meaning |
|--------|---------|
| 400 | Bad Request — Validation error or missing fields |
| 401 | Unauthorized — Invalid credentials or token |
| 404 | Not Found — Route or resource doesn't exist |
| 500 | Internal Server Error — Server-side issue |

---

## Notes for Developers

* All timestamps are in ISO 8601 format
* Tokens expire: accessToken (15m), refreshToken (7d)
* Passwords are hashed with bcrypt (10 rounds)
* Username must be unique and lowercase
* Email must be unique and valid format

