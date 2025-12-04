import React, {useEffect, useState} from 'react';
import {api} from '../api/client';
import { useParams, Link } from 'react-router-dom';

export default function Article(){
  const {id} = useParams();
  const [article, setArticle] = useState(null);
  useEffect(()=> {
    api.get(`/articles/${id}`).then(r => setArticle(r.data)).catch(console.error);
  }, [id]);
  if(!article) return <div>Loading...</div>;
  return (
    <div>
      <Link to="/">← Back</Link>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{__html: article.content.replace(/\n/g,'<br/>')}}/>
    </div>
  )
}
