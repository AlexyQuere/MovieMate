import './Movie.css';

const Movie = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.name} />
      <div className="movie-details">
        <h2>{movie.name}</h2>
        <p>Date de sortie : {movie.date}</p>
      </div>
    </div>
  );
};

export default Movie;
