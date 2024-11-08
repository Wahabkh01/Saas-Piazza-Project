const db = require('../db');

const createPost = async (title, body, topics, ownerId, expiration) => {
    const result = await db.query(
        `INSERT INTO posts (title, body, topics, owner_id, expiration) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [title, body, topics, ownerId, expiration]
    );
    return result.rows[0];
};

const getAllPosts = async () => {
    const result = await db.query(`SELECT * FROM posts ORDER BY timestamp DESC`);
    return result.rows;
};

const getPostById = async (id) => {
    const result = await db.query(`SELECT * FROM posts WHERE id = $1`, [id]);
    return result.rows[0];
};

const updatePostStatus = async (id, status) => {
    await db.query(`UPDATE posts SET status = $1 WHERE id = $2`, [status, id]);
};

module.exports = { createPost, getAllPosts, getPostById, updatePostStatus };
