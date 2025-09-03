// config/mongoose.js
const mongoose = require('mongoose');

async function connectMongo(uri) {
  if (!uri) throw new Error('MONGO_URI is required');
  mongoose.set('strictQuery', true); // safer querying
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
}

async function disconnectMongo() {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
}

module.exports = { connectMongo, disconnectMongo };
