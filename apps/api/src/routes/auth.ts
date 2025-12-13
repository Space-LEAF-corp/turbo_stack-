import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

// In-memory user storage (for demo without database)
const users: { id: string; email: string; password: string }[] = [];

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: Math.random().toString(36).substring(7),
    email,
    password: hashedPassword,
  };
  users.push(user);

  res.status(201).json({ message: 'User created successfully', userId: user.id });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', userId: user.id });
});

export default router;
