import './Movieinfo.css';

const Movie = ({ movie }) => {
  const actors = movie.actors.slice(0, 3).map((actor) => actor.name);
  const releaseYear = new Date(movie.releasedate).getFullYear();

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.image}`}
        alt={movie.name}
      />
      <h1>{movie.name}</h1>
      <h2>Release Year: {releaseYear}</h2>
      <h2>Director: {movie.director.name}</h2>
      <h3>Synopsis: {movie.synopsis}</h3>
      <h3>Actors:</h3>
      <ul>
        {actors.map((actor, index) => (
          <li key={index}>{actor}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movie;
