// routers/dbRouter.js
const express = require('express');
const { uploadDb } = require('../middleware/fileUploadMiddleware');
const dbController = require('../controllers/dbController.js');

const router = express.Router();

// POST /api/dbs  (multipart form-data with field: dbFile)
router.post('/', (req, res, next) => {
  uploadDb(req, res, function (err) {
    if (err) return next(err);           // pass multer errors to errorMiddleware
    if (!req.file) {
      return res.status(400).json({ error: 'dbFile is required (.db or .sqlite)' });
    }
    next();
  });
}, dbController.createDb);

// GET /api/dbs/:filename/tables  (list table names)
router.get('/:filename/tables', dbController.listTables);

module.exports = router;
