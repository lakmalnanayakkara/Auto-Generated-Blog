import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { Link } from 'react-router-dom';
import '../styles/Articles.css';
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Articles() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get('/articles').then(r => setList(r.data)).catch(console.error);
  }, []);

  useEffect(() => {
    socket.on("new-article", article => {
      setList(prev => [article, ...prev]); // add new article to top
    });

    return () => socket.off("new-article");
  }, []);

  return (
    <div className="articles-container">

      <div className="header-row">
        <h1 className="main-title">Trending Technologies Blog</h1>
      </div>

      <div className="card-grid">
        {list.map(a => (
          <div key={a.id} className="article-card">
            <h3>
              <Link to={`/article/${a.id}`} className="card-title">
                {a.title}
              </Link>
            </h3>
            <p className="card-date">
              {new Date(a.created_at + "Z").toLocaleString()}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
