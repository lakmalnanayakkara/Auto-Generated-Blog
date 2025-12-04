import {useEffect, useState} from 'react';
import {api} from '../api/client';
import { Link } from 'react-router-dom';

export default function Articles(){
  const [list,setList] = useState([]);
  useEffect(()=> {
    api.get('/articles').then(r=> setList(r.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h1>Auto-generated Blog</h1>
      <ul>
        {list.map(a => (
          <li key={a.id}>
            <Link to={`/article/${a.id}`}>{a.title}</Link> — {new Date(a.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
