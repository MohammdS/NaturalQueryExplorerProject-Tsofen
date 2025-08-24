const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Import bookmark router
const bookmarkRouter = require('./router/bookmarkRouter');
app.use('/api/bookmarks', bookmarkRouter);

// Import query router for human language DB queries
const queryRouter = require('./router/queryRouter');
app.use('/api/queries', queryRouter);

// Root route
app.get('/', (req, res) => {
  res.send('🚀API is running...');
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server listening on http://localhost:${port}`);
});
