// src/App.js
import { Route, Routes } from 'react-router-dom';
import Movie_by_genre from './pages/Movie_by_genre/Movie_by_genre';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import MovieRecommendations from './pages/MovieRecommendations/MovieRecommendations'; 
import { Movieinfo } from './pages/Movieinfo/Movieinfo';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/movies" element={<Movie_by_genre />} />
        <Route path="/movies/:movieId" element={<Movieinfo />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route path="recommendations" element={<MovieRecommendations />} />
      </Routes>
    </Layout>
  );
}

export default App;
