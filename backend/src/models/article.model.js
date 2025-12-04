import { pool } from './db.js';

export async function getAllArticles() {
  const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
  return result.rows;
}

export async function getArticleById(id) {
  const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
  return result.rows[0];
}

export async function createArticle(title, content) {
  const result = await pool.query(
    'INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  return result.rows[0];
}
