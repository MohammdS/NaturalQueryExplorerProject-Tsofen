// services/userService.js
const { isStrongPassword } = require('../utils/validatePassword');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET not set in .env');


class UserService {
    async signup(name, email, password) {
        if (!isStrongPassword(password)) {
            const err = new Error('Password must be at least 8 characters long and include upper, lower, number, and special char');
            err.status = 400;
            throw err;
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const err = new Error('Email already in use');
            err.status = 409;
            throw err;
        }


        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash });
        return this.#generateToken(user);
    }


    async signin(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }


        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }


        return this.#generateToken(user);
    }


    #generateToken(user) {
        return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '7d',
        });
    }
}


module.exports = new UserService();