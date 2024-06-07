import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios if you're using it
import Movie from '../Moviecard/Moviecard';
import './Movie_list_by_genre.css';

const Movie_list_by_genre = ({ checkedValue }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/movies/genre/${checkedValue}`)
      .then((response) => {
        console.log(response);
        setMovies(response.data.movies);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des films:', error);
      });
  }, [checkedValue]);

  return (
    <div>
      <h1>Films {checkedValue}</h1>
      <div className="moviecardflex">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movie_list_by_genre;
