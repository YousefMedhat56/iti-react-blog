const express = require('express');
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().populate('author', 'username fullName');
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Get articles by author
router.get('/author/:authorId', async (req, res) => {
    try {
        const articles = await Article.find({ author: req.params.authorId }).populate('author', 'username fullName');
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get article by id
router.get('/:articleId', async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId).populate('author', 'username fullName');
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create article
router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;
    try {
        const article = new Article({ title, content, author: req.user.userId });
        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update article
router.put('/:id', auth, async (req, res) => {
    const { title, content } = req.body;
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        if (article.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        article.title = title;
        article.content = content;
        await article.save();
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete article
router.delete('/:id', auth, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        if (article.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await article.deleteOne();
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;