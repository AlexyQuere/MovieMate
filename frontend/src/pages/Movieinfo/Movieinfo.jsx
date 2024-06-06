import { useParams } from 'react-router-dom';
import './Movieinfo.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../../components/Movieinfo/Movieinfo';

export const Movieinfo = () => {
  const { movieId } = useParams(); // Destructuring id from useParams
  const [movie, setMovie] = useState(null); // Changed movies to movie since you're fetching a single movie

  useEffect(() => {
    axios
      .get(`http://localhost:8000/movies/${movieId}`) // Using id instead of param
      .then((response) => {
        console.log(response);
        setMovie(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du film:', error);
      });
  }, []);
  if (movie === null) {
    return <div>Loading</div>;
  }

  return <Movie key={movie.id} movie={movie} />;
};
