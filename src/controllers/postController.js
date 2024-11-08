const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { title, body, topics, expiration } = req.body;
    const ownerId = req.user.id; // Assumes JWT middleware adds `user` to request
    try {
        const post = await Post.createPost(title, body, topics, ownerId, expiration);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
};
