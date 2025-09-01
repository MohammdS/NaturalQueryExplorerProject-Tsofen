const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');
const { validatePrompt } = require('../middleware/promptMiddleware');

// POST /api/prompts - Create a new prompt
router.post('/', validatePrompt, promptController.createPrompt);

// GET /api/prompts - Get all prompts
router.get('/', promptController.getPrompts);

module.exports = router;
