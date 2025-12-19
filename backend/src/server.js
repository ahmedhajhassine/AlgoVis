import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'AlgoVis Backend is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/algorithms', (req, res) => {
  res.json({ message: 'Algorithms API - Coming Soon' });
});

app.use('/api/datasets', (req, res) => {
  res.json({ message: 'Datasets API - Coming Soon' });
});

app.use('/api/ml', (req, res) => {
  res.json({ message: 'ML API - Coming Soon' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   AlgoVis Backend Server              ║
  ║   Running on: http://localhost:${PORT}   ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}        ║
  ╚═══════════════════════════════════════╝
  `);
});
