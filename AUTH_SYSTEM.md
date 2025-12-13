# Authentication System

Complete JWT-based authentication system with session management.

## Features

- ✅ User signup with email/password
- ✅ User login with JWT tokens
- ✅ Session management (7-day expiration)
- ✅ Password hashing with bcrypt
- ✅ Protected routes
- ✅ Profile page
- ✅ Logout functionality
- ✅ Auth context for state management

## Backend Endpoints

### POST /api/auth/signup
Create a new user account.
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

### POST /api/auth/login
Login with email and password.
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
Returns JWT token and user data.

### GET /api/auth/me
Get current user (requires authentication).
Headers: `Authorization: Bearer <token>`

### POST /api/auth/logout
Logout current session (requires authentication).
Headers: `Authorization: Bearer <token>`

### POST /api/auth/logout-all
Logout all sessions for the user (requires authentication).

### PATCH /api/auth/profile
Update user profile (requires authentication).
```json
{
  "name": "New Name",
  "avatar": "https://example.com/avatar.jpg"
}
```

### POST /api/auth/change-password
Change user password (requires authentication).
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

## Frontend Pages

- `/login` - Login page
- `/signup` - Signup page
- `/profile` - User profile (protected)

## Environment Variables

### Backend (apps/api/.env)
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/turbo_stack
JWT_SECRET=your-secret-key-change-this-in-production
```

### Frontend (apps/web/.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Usage

1. Start the backend server:
```bash
pnpm dev --filter backend
```

2. Start the frontend:
```bash
pnpm dev --filter frontend
```

3. Navigate to:
   - http://localhost:3000 - Home page
   - http://localhost:3000/signup - Create account
   - http://localhost:3000/login - Sign in
   - http://localhost:3000/profile - View profile (after login)

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiration
- Session validation on protected routes
- Automatic session cleanup (keeps last 5 sessions)
- Password never returned in API responses
- Protected routes redirect to login if not authenticated

## Testing

Create a test user:
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

Login:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Get current user:
```bash
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
