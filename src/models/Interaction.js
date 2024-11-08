const db = require('../db');

const addInteraction = async (postId, userId, type, commentBody = null) => {
    const result = await db.query(
        `INSERT INTO interactions (post_id, user_id, type, comment_body) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [postId, userId, type, commentBody]
    );
    return result.rows[0];
};

const getInteractionsByPostId = async (postId) => {
    const result = await db.query(
        `SELECT * FROM interactions WHERE post_id = $1 ORDER BY timestamp DESC`,
        [postId]
    );
    return result.rows;
};

module.exports = { addInteraction, getInteractionsByPostId };
