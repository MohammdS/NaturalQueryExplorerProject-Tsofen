const validatePrompt = (req, res, next) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Valid prompt text is required' });
    }

    req.body.text = text.trim();
    next();
};

module.exports = {
    validatePrompt
};
