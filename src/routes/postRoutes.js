const express = require('express');
const postController = require('../controllers/postController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, postController.createPost);
router.get('/', postController.getAllPosts);

module.exports = router;
