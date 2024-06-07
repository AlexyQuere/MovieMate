import React, { useEffect, useState } from 'react';
import './Movieinfo.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Movie = ({ movie }) => {
  const [rating, setRating] = useState(0);

  const actors = movie.actors.slice(0, 3).map((actor) => actor.name);
  const releaseYear = new Date(movie.releasedate).getFullYear();

  const actorsString = actors.join(', ');
  const genresString = movie.genres.map((genre) => genre.name).join(', ');

  useEffect(() => {
    const timer = setTimeout(() => {
      setRating(movie.globalrating * 10);
    }, 100);

    return () => clearTimeout(timer);
  }, [movie.globalrating]);

  return (
    <div className="movieinfobox">
      <div className="movieinfo">
        <div className="titledirector">
          <h1>
            {movie.name} ({releaseYear})
          </h1>
          <h2 className="director">by {movie.director.name}</h2>
        </div>
        <h2>Actors : {'  ' + actorsString}</h2>
        <h2>Genres : {'       ' + genresString}</h2>
        <h3>{movie.synopsis}</h3>
        <div className="rating-container">
          <CircularProgressbar
            value={rating}
            text={`${rating}%`}
            styles={buildStyles({
              textColor: '#000000',
              pathColor: '#008000',
              trailColor: '#333',
            })}
          />
        </div>
      </div>
      <div className="movieimage">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.image}`}
          alt={movie.name}
        />
      </div>
    </div>
  );
};

export default Movie;
