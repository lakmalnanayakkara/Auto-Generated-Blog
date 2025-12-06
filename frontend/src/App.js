import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Articles from './pages/Articles';
import Article from './pages/Article';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Articles/>}/>
        <Route path="/article/:id" element={<Article/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
