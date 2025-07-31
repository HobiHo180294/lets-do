/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import os from 'os';
import authRoute from './routes/auth.js';
import todoRoute from './routes/todos.js';

const app = express();
dotenv.config();

// * Constants
const { BACKEND_PORT } = process.env || 3000;
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// * Middleware
app.use(cors());
app.use(express.json());

// * Routes
app.use('/api/auth', authRoute);
app.use('/api/todos', todoRoute);

app.use('/', async (req, res) => {
  res.json({ message: 'Everything works fine!', hostname: req.hostname });
});

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ooena3i.mongodb.net/${DB_NAME}`
    );

    app.listen(BACKEND_PORT, () => {
      console.log(`Running container: ${os.hostname()}`);
    });

    return null;
  } catch (error) {
    return error;
  }
}

start();
