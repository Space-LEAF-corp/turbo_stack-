# 🚀 Full Stack Loop Setup Guide

This guide walks you through testing the complete **Frontend → Backend → Database** loop.

## ✅ What's Implemented

### 1. Frontend (`/hello` page)
- **Location**: `apps/web/src/pages/hello.tsx`
- **Route**: http://localhost:3000/hello
- **Features**:
  - Displays "Captain's Log Online"
  - Shows status of frontend, backend, and database connections
  - Fetches and displays latest log entry from database

### 2. Backend API (`/api/hello` endpoint)
- **Location**: `apps/api/src/index.ts`
- **Route**: http://localhost:3001/api/hello
- **Response**:
  ```json
  {
    "message": "Backend alive",
    "timestamp": "2025-12-13T...",
    "logEntry": { ... },
    "databaseConnected": true
  }
  ```

### 3. Database (Prisma + PostgreSQL)
- **Model**: `LogEntry` in `packages/database/prisma/schema.prisma`
- **Fields**:
  - `id`: Unique identifier
  - `content`: Log entry text
  - `stardate`: Optional stardate
  - `captain`: Captain's name (default: Jean-Luc Picard)
  - `createdAt`, `updatedAt`: Timestamps

## 🔧 Setup Instructions

### Option 1: With Docker (Full Database)

1. **Install Docker Desktop** (if not already installed)
   - Download from: https://www.docker.com/products/docker-desktop

2. **Start PostgreSQL**:
   ```bash
   docker-compose up -d
   ```

3. **Setup Database**:
   ```bash
   pnpm db:setup
   ```
   This will:
   - Generate Prisma client
   - Push schema to database
   - Seed with sample data

4. **Install dependencies with database package**:
   ```bash
   pnpm install
   ```

5. **Restart backend** to connect to database:
   ```bash
   # Stop current backend (Ctrl+C)
   pnpm dev --filter backend
   ```

6. **Visit the page**:
   ```
   http://localhost:3000/hello
   ```

### Option 2: Without Docker (Backend Only)

If you don't have Docker, you can still test frontend ↔ backend:

1. **Visit the hello page**:
   ```
   http://localhost:3000/hello
   ```

2. You'll see:
   - ✅ Frontend: Working
   - ✅ Backend: "Backend alive"
   - ⏳ Database: Not configured message

## 🧪 Testing the Full Loop

### Test Backend Directly:
```bash
curl http://localhost:3001/api/hello
```

Expected response (with database):
```json
{
  "message": "Backend alive",
  "timestamp": "2025-12-13T15:30:00.000Z",
  "logEntry": {
    "id": "clxxx...",
    "content": "We have entered orbit...",
    "stardate": "47634.44",
    "captain": "Jean-Luc Picard",
    "createdAt": "2025-12-13T15:30:00.000Z",
    "updatedAt": "2025-12-13T15:30:00.000Z"
  },
  "databaseConnected": true
}
```

### View in Browser:
Navigate to: http://localhost:3000/hello

You should see:
- 🚀 **Captain's Log Online** (big animated title)
- ✅ **Frontend**: Next.js page loaded
- ✅ **Backend**: Backend alive
- ✅ **Database**: Shows latest log entry
- 🎉 **Full Stack Loop**: ALL SYSTEMS GO!

## 📦 Database Commands

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Seed database with sample data
pnpm db:seed

# Open Prisma Studio (database GUI)
cd packages/database && pnpm db:studio

# All-in-one setup
pnpm db:setup
```

## 🐛 Troubleshooting

### Backend can't connect to database?
- Make sure Docker is running: `docker ps`
- Check docker-compose is up: `docker-compose ps`
- Verify DATABASE_URL in `packages/database/.env`

### Port already in use?
- Frontend (3000): Stop other Next.js instances
- Backend (3001): Stop other Node.js servers
- Database (5432): Stop other PostgreSQL instances

### CORS errors?
- Backend has CORS enabled for all origins in development
- Make sure backend is running on port 3001

## 🎯 What's Next?

Now that the full loop is confirmed, you can:

1. Add more API endpoints to the backend
2. Create more pages in the frontend
3. Add more Prisma models to the database
4. Implement authentication
5. Build the learning system features!

## 📊 Architecture

```
┌─────────────────┐
│   Frontend      │  Next.js on :3000
│   /hello page   │  → Fetches from backend
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Backend API   │  Express on :3001
│   /api/hello    │  → Queries database
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Database      │  PostgreSQL on :5432
│   LogEntry      │  ← Via Prisma ORM
└─────────────────┘
```

---

**Status**: All components implemented and ready to test! 🚀
