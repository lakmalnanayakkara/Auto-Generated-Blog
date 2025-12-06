import { pool } from './db.js';
import { v4 as uuidv4 } from 'uuid';

export async function getAllArticles() {
  const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
  return result.rows;
}

export async function getArticleById(id) {
  const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
  return result.rows[0];
}

export async function createArticle(title, content) {
  const id = uuidv4(); 
  const result = await pool.query(
    'INSERT INTO articles (id, title, content) VALUES ($1, $2, $3) RETURNING *',
    [id, title, content]
  );
  return result.rows[0];
}
