// services/dbService.js
const path = require('path');
const { selectAll } = require('../utils/sqliteRunner');
const UploadedDb = require('../models/UploadedDb');
const User = require('../models/user');
const fs = require('fs');


async function registerUploadedDb(file, userId) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.db' && ext !== '.sqlite') {
    const err = new Error('Invalid file type (only .db or .sqlite allowed)');
    err.status = 400;
    throw err;
  }

  // Create and save new uploaded DB
  const db = new UploadedDb({
    userId,
    originalName: file.originalname,
    storedFilename: file.filename,
    storagePath: file.path,
    size: file.size,
  });
  await db.save();

  // Update user's uploadedFiles list
  const user = await User.findById(userId).populate('uploadedFiles');

  if (!user) {
    throw new Error('User not found');
  }

  // If user already has 5 files, delete the oldest one
  if (user.uploadedFiles.length >= 5) {
    const oldest = user.uploadedFiles[0];

    // 1. Remove from DB
    await UploadedDb.deleteOne({ _id: oldest._id });

    // 2. Remove from disk (safely)
    try {
      fs.unlinkSync(oldest.storagePath);
    } catch (err) {
      console.warn(`⚠️ Could not delete file from disk: ${oldest.storagePath}`);
      console.error('Full error:', err);
    }    

    // 3. Remove reference from user
    user.uploadedFiles.shift();
  }

  // Push new file and save user
  user.uploadedFiles.push(db._id);
  await user.save();

  return db;
}

// list table names in the uploaded DB
async function listTables(filename) {
  const sql = `
    SELECT name
    FROM sqlite_master
    WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name
  `;
  const rows = selectAll(filename, sql);
  return rows.map(r => r.name);
}

module.exports = { registerUploadedDb, listTables };
