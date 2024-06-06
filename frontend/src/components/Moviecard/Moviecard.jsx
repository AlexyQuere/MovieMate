import './Moviecard.css';

const Movie = ({ movie }) => {
  return (
    <div className="movie-card">
      <a href={`http://localhost:3000/movies/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.image}`}
          alt={movie.name}
        />
        <h2>{movie.name}</h2>
      </a>
    </div>
  );
};

export default Movie;
