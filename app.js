// app.js
const express = require('express');
const cors = require('cors');

const { notFound, errorMiddleware } = require('./middleware/errorMiddleware');

// Routers
const dbRouter = require('./routers/dbRouter');
const promptRouter = require('./routers/promptRouter');

const app = express();

// 1) Global middlewares
app.use(cors());
app.use(express.json());

// 2) Simple request logger (kept from your index.js)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 3) Health endpoint (helps verify server is up; useful for Docker/K8s too)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 4) Mount your existing features
app.use('/api/prompts', promptRouter);
app.use('/api/dbs', dbRouter);

// 5) 404 & error handlers — these must come after routes
app.use(notFound);
app.use(errorMiddleware);

module.exports = { app };
