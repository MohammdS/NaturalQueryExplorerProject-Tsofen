// server.js
require('dotenv').config(); // Load .env BEFORE reading process.env

const http = require('http');
const { app } = require('./app');
const { loadEnv } = require('./config/env');
const { connectMongo, disconnectMongo } = require('./config/mongoose');

(async function main() {
  const env = loadEnv();           // 1) validate env
  await connectMongo(env.MONGO_URI); // 2) connect DB

  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    console.log(`Server listening on http://localhost:${env.PORT}`);
  });

  // 3) graceful shutdown
  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down...`);
    server.close(async () => {
      await disconnectMongo();
      console.log('Bye!');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));   // Ctrl+C
  process.on('SIGTERM', () => shutdown('SIGTERM')); // containers
})();
