import express from 'express';
import cors from 'cors';
import articleRoutes from './routes/article.routes.js';
import './services/articleJob.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

app.use('/articles', articleRoutes);

global.io = io;

const port = process.env.PORT || 5000;
server.listen(port, function () {
  console.log(`server at http://localhost:${port}`);
});
