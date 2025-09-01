const promptService = require('../services/promptService');

class PromptController {
    async createPrompt(req, res) {
        try {
            const { text } = req.body;
            
            if (!text) {
                return res.status(400).json({ error: 'Prompt text is required' });
            }

            const newPrompt = await promptService.createPrompt(text);
            res.status(201).json(newPrompt);
        } catch (error) {
            console.error('Error creating prompt:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getPrompts(req, res) {
        try {
            const prompts = await promptService.getPrompts();
            res.json(prompts);
        } catch (error) {
            console.error('Error getting prompts:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new PromptController();
