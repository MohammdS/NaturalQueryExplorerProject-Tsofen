const Prompt = require('../models/promptModel');
const fs = require('fs').promises;
const path = require('path');

class PromptService {
    constructor() {
        this.prompts = [];
        this.dataFile = path.join(__dirname, '../data/queryRequests.json');
    }

    async loadPrompts() {
        try {
            const data = await fs.readFile(this.dataFile, 'utf8');
            this.prompts = JSON.parse(data);
        } catch (error) {
            // If file doesn't exist, start with empty array
            this.prompts = [];
        }
    }

    async savePrompts() {
        await fs.writeFile(this.dataFile, JSON.stringify(this.prompts, null, 2));
    }

    async createPrompt(text) {
        await this.loadPrompts();
        
        const newPrompt = new Prompt(
            Date.now().toString(), // Simple ID generation
            text,
            new Date().toISOString()
        );

        this.prompts.push(newPrompt);
        await this.savePrompts();
        return newPrompt;
    }

    async getPrompts() {
        await this.loadPrompts();
        return this.prompts;
    }
}

module.exports = new PromptService();
