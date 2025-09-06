// models/UploadedDb.js

const mongoose = require('mongoose');

const uploadedDbSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  originalName: {
    type: String,
    required: true,
    trim: true,
  },
  storedFilename: {
    type: String,
    required: true,
  },
  storagePath: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  driver: {
    type: String,
    enum: ['sqlite'], // If you plan to support only SQLite
    default: 'sqlite',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UploadedDb', uploadedDbSchema);