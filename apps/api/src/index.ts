import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from '@turbo-stack/database';
import authRoutes from './routes/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Turbo Stack API is running!' });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/hello', async (req: Request, res: Response) => {
  try {
    // Fetch the latest log entry from database
    const logEntry = await prisma.logEntry.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      message: 'Backend alive',
      timestamp: new Date().toISOString(),
      logEntry: logEntry,
      databaseConnected: true,
    });
  } catch (error) {
    console.error('Database error:', error);
    res.json({
      message: 'Backend alive',
      timestamp: new Date().toISOString(),
      logEntry: null,
      databaseConnected: false,
      error: 'Database not configured. Run: docker-compose up -d && pnpm db:setup',
    });
  }
});

app.get('/api/learn', (req: Request, res: Response) => {
  res.json({
    message: 'Learning endpoints',
    endpoints: [
      '/api/learn/courses',
      '/api/learn/progress',
      '/api/learn/achievements',
    ],
  });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
