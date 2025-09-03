// utils/sqliteRunner.js
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, '../uploads/dbs');

// Very small guard against path traversal: only allow files inside uploads/dbs
function resolveDbPath(filename) {
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    const err = new Error('Invalid filename');
    err.status = 400;
    throw err;
  }
  const fullPath = path.join(UPLOAD_DIR, filename);
  if (!fs.existsSync(fullPath)) {
    const err = new Error('Database file not found');
    err.status = 404;
    throw err;
  }
  return fullPath;
}

// Open DB safely with read-only flags
function openReadOnly(filename) {
  const fullPath = resolveDbPath(filename);
  // WRITER NOTE: pragma settings that are safe for read-only listing
  const db = new Database(fullPath, { readonly: true, fileMustExist: true });
  return db;
}

// Run a simple SELECT and return rows as array of objects
function selectAll(filename, sql, params = []) {
  const db = openReadOnly(filename);
  try {
    const stmt = db.prepare(sql);
    const rows = stmt.all(params);
    return rows;
  } finally {
    db.close();
  }
}

module.exports = { selectAll, resolveDbPath };
