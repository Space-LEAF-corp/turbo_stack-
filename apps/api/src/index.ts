import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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
  res.json({
    message: 'Backend alive',
    timestamp: new Date().toISOString(),
    note: 'In-memory auth (no database required)',
  });
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
