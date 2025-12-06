import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import { useParams, Link } from "react-router-dom";
import "../styles/Article.css"; // <— add this

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.get(`/articles/${id}`)
      .then((r) => setArticle(r.data))
      .catch(console.error);
  }, [id]);

  if (!article) return <div className="loading">Loading...</div>;

  return (
    <div className="article-container">
      <Link to="/" className="back-btn">← Back</Link>

      <h1 className="article-title">{article.title}</h1>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
