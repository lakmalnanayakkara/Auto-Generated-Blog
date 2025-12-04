import express from 'express';
import cors from 'cors';
import articleRoutes from './routes/article.routes.js';
import './services/articleJob.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/articles', articleRoutes);

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`server at http://localhost:${port}`);
});
