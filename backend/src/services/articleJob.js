import cron from 'node-cron';
import { generateArticle } from './aiClient.js';
import { createArticle } from '../models/article.model.js';

cron.schedule("0 0 * * *", async () => {
  console.log("Generating new article...");

  const content = await generateArticle("Write a short blog post about technology trends.");
  
  await createArticle("Daily Auto Article", content);

  console.log("Article created!");
});
