// controllers/dbController.js
const dbService = require('../services/dbService');

class DbController {
async createDb(req, res, next) {
try {
const file = req.file;
const userId = req.user._id;
const meta = await dbService.registerUploadedDb(file , userId);
res.status(201).json({ message: 'Database uploaded successfully', db: meta });
} catch (err) { next(err); }
}

async listTables(req, res, next) {
try {
const { filename } = req.params;
const tables = await dbService.listTables(filename);
res.json({ filename, tables });
} catch (err) { next(err); }
}
}

module.exports = new DbController();