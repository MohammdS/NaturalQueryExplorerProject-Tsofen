// routes/userRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/userMiddleware');

// @route   POST /api/users/signup
router.post('/signup', userController.signup);

// @route   POST /api/users/signin
router.post('/signin', userController.signin);

// @route   GET /api/users/me
router.get('/me', protect, (req, res) => {
  res.json(req.user); // returns authenticated user's data
});

module.exports = router;