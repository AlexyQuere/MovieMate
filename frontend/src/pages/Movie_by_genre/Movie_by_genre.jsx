import { useState } from 'react';
import Movie_genre from '../../components/Moviegenrecheckbox/Moviegenrecheckbox';
import Movie_list_by_genre from '../../components/Movie_list_by_genre/Movie_list_by_genre';

const Movie_by_genre = () => {
  const [checkedValue, setCheckedValue] = useState('');

  return (
    <div>
      <Movie_genre setCheckedValue={setCheckedValue} />
      <Movie_list_by_genre checkedValue={checkedValue} />
    </div>
  );
};

export default Movie_by_genre;
