import { useState } from 'react';
import Movie_genre from '../../components/Moviegenrecheckbox/Moviegenrecheckbox';
import Movie_list_by_genre from '../../components/Movie_list_by_genre/Movie_list_by_genre';
import './Movie_by_genre.css';
const Movie_by_genre = () => {
  const [checkedValue, setCheckedValue] = useState('');

  return (
    <div className="movielist">
      <div className="Genrelist">
        <Movie_genre setCheckedValue={setCheckedValue} />
      </div>
      <div className="Movielist">
        <Movie_list_by_genre checkedValue={checkedValue} />
      </div>
    </div>
  );
};

export default Movie_by_genre;
