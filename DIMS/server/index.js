import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Web3 from 'web3';
import { create } from 'ipfs-http-client';
import { authMiddleware } from './middleware/auth.js';
import { didRoutes } from './routes/did.js';
import { authRoutes } from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Web3
const web3 = new Web3(process.env.ETH_NODE_URL || 'http://localhost:8545');

// Initialize IPFS client
const ipfs = create({ url: process.env.IPFS_NODE_URL || 'http://localhost:5001' });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/did', authMiddleware, didRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { web3, ipfs };