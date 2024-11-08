const Interaction = require('../models/Interaction');

exports.addInteraction = async (req, res) => {
    const { postId } = req.params;
    const { type, commentBody } = req.body;
    const userId = req.user.id;

    try {
        const interaction = await Interaction.addInteraction(postId, userId, type, commentBody);
        res.status(201).json(interaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add interaction' });
    }
};
