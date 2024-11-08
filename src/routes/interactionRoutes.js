const express = require('express');
const interactionController = require('../controllers/interactionController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:postId/interact', authenticate, interactionController.addInteraction);

module.exports = router;
