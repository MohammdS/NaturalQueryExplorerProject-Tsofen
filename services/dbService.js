// services/dbService.js
const path = require('path');
const { selectAll } = require('../utils/sqliteRunner');

async function registerUploadedDb(file) {
  // file fields from multer: { filename, originalname, size, path, destination, mimetype }
  const ext = path.extname(file.originalname).toLowerCase();

  // Additional guard — should be redundant if fileFilter already checked
  if (ext !== '.db' && ext !== '.sqlite') {
    const err = new Error('Invalid file type (only .db or .sqlite allowed)');
    err.status = 400;
    throw err;
  }

  // In the next epic we’ll persist this in Mongo:
  // { owner: userId, filename, storagePath, size, driver: 'sqlite', createdAt }
  // For now, just return useful metadata
  return {
    filename: file.filename,
    originalname: file.originalname,
    storagePath: file.path,
    size: file.size,
    driver: 'sqlite',
    uploadedAt: new Date().toISOString(),
  };
}

// list table names in the uploaded DB
async function listTables(filename) {
    // SQLite catalogs in sqlite_master. We only want user tables.
    const sql = `
      SELECT name
      FROM sqlite_master
      WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `;
    const rows = selectAll(filename, sql);
    // Map to a clean array like ["Customers", "Orders", ...]
    return rows.map(r => r.name);
  }
  
module.exports = { registerUploadedDb, listTables };
