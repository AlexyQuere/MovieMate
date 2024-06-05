import React, { useState } from 'react';
import Movie_genre from './components/Movie_genre/Movie_genre';
import Home from './pages/Home/Home';

const App = () => {
  const [checkedValue, setCheckedValue] = useState('');

  return (
    <div>
      <Movie_genre setCheckedValue={setCheckedValue} />
      <Home checkedValue={checkedValue} />
    </div>
  );
};

export default App;
