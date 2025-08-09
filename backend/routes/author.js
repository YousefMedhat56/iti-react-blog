const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get("/:authorId", async (req, res) => {
    try {
        const user = await User.findById(req.params.authorId);
        if (!user) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.json({ fullName: user.fullName, username: user.username, id: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;