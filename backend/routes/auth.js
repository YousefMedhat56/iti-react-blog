const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    const { username, fullName, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, fullName, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { username, fullName, id: user._id } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Wrong username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong username or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { username, fullName: user.fullName, id: user._id } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;