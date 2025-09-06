// controllers/userController.js
const userService = require('../services/userService');


class UserController {
// POST /api/users/signup
async signup(req, res, next) {
try {
const { name, email, password } = req.body;
const token = await userService.signup(name, email, password);
res.status(201).json({ message: 'User registered successfully', token });
} catch (err) {
next(err);
}
}


// POST /api/users/signin
async signin(req, res, next) {
try {
const { email, password } = req.body;
const token = await userService.signin(email, password);
res.status(200).json({ message: 'Login successful', token });
} catch (err) {
next(err);
}
}
}


module.exports = new UserController();