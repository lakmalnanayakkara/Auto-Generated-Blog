import cron from 'node-cron';
import { generateArticle } from './aiClient.js';
import { createArticle } from '../models/article.model.js';

cron.schedule('*/5 * * * *', async () => {
  const content = await generateArticle("Write a short blog post about a trnding technology."); 
  await createArticle("Daily Tech Article", content);
  
  if (global.io) {
    global.io.emit("new-article", newArticle);
  }
});
