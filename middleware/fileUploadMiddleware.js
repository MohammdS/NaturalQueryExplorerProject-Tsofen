// middleware/fileUploadMiddleware.js
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Ensure target folder exists
const UPLOAD_DIR = path.join(__dirname, '../uploads/dbs');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Configure disk storage: we keep original file name but prefix with timestamp to avoid collisions.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safeBase = path.basename(file.originalname).replace(/\s+/g, '_');
    const ts = Date.now();
    cb(null, `${ts}_${safeBase}`);
  },
});

// File type guard — accept only .db / .sqlite
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  const ok = ext === '.db' || ext === '.sqlite';
  if (!ok) {
    return cb(new Error('Only .db or .sqlite files are allowed'));
  }
  cb(null, true);
}

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

const uploadDb = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE_BYTES },
}).single('dbFile'); // the form field name must be "dbFile"

module.exports = { uploadDb, UPLOAD_DIR };
