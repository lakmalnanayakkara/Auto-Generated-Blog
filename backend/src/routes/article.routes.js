import express from 'express';
import { getAllArticles, getArticleById, createArticle } from '../models/article.model.js';
import { generateArticle } from '../services/aiClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const articles = await getAllArticles();
  res.json(articles);
});

router.get('/:id', async (req, res) => {
  const article = await getArticleById(req.params.id);
  res.json(article);
});

router.post('/generate', async (req, res) => {
  const prompt = req.body.prompt ?? "Generate a blog post";
  const content = await generateArticle(prompt);
  const article = await createArticle("AI Generated Article", content);
  res.json(article);
});

export default router;
