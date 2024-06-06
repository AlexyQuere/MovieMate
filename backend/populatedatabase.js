import axios from 'axios';
import { DataSource } from 'typeorm';
import Actor from './entities/actors.js';
import Director from './entities/directors.js';
import Genre from './entities/genre.js';
import Movie from './entities/movies.js';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite3',
  synchronize: true,
  logging: true,
  entities: [Actor, Director, Genre, Movie],
});

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo';

async function fetchMovies(page = 1) {
  const response = await axios.get(
    'https://api.themoviedb.org/3/discover/movie',
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        sort_by: 'popularity.desc',
        page,
      },
    }
  );

  return response.data.results;
}

async function fetchMovieDetailsAndCredits(movieId) {
  const [movieDetailsResponse, creditsResponse] = await Promise.all([
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }),
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }),
  ]);

  return {
    movieDetails: movieDetailsResponse.data,
    credits: creditsResponse.data,
  };
}

async function populateDatabase() {
  await appDataSource.initialize();

  let movies = [];
  for (let page = 1; page <= 10; page++) {
    const moviesPage = await fetchMovies(page);
    movies = [...movies, ...moviesPage];
  }

  for (const movieData of movies) {
    const { movieDetails, credits } = await fetchMovieDetailsAndCredits(
      movieData.id
    );

    const movieRepository = appDataSource.getRepository(Movie);
    const genreRepository = appDataSource.getRepository(Genre);
    const actorRepository = appDataSource.getRepository(Actor);
    const directorRepository = appDataSource.getRepository(Director);

    const movie = movieRepository.create();
    movie.name = movieDetails.title;
    movie.releasedate = new Date(movieDetails.release_date);
    movie.image = movieDetails.poster_path;
    movie.globalrating = movieDetails.vote_average;
    movie.synopsis = movieDetails.overview;

    // Initialize empty arrays for relations
    movie.genres = [];
    movie.actors = [];

    // Handle genres
    for (const genreData of movieDetails.genres) {
      let genre = await genreRepository.findOne({
        where: { id: genreData.id },
      });
      if (!genre) {
        genre = genreRepository.create();
        genre.id = genreData.id;
        genre.name = genreData.name;
        await genreRepository.save(genre);
      }
      if (!movie.genres.some((g) => g.id === genre.id)) {
        movie.genres.push(genre);
      }
    }

    // Handle actors
    for (const castData of credits.cast) {
      let actor = await actorRepository.findOne({ where: { id: castData.id } });
      if (!actor) {
        actor = actorRepository.create();
        actor.id = castData.id;
        actor.name = castData.name;
        await actorRepository.save(actor);
      }
      if (!movie.actors.some((a) => a.id === actor.id)) {
        movie.actors.push(actor);
      }
    }

    // Handle director
    const directorData = credits.crew.find(
      (member) => member.job === 'Director'
    );

    if (directorData) {
      let director = await directorRepository.findOne({
        where: { id: directorData.id },
      });
      if (!director) {
        director = directorRepository.create();
        director.id = directorData.id;
        director.name = directorData.name;
        await directorRepository.save(director);
      }
      movie.director = director;
    }

    await movieRepository.save(movie);
  }

  console.log('Database populated!');
  await appDataSource.destroy();
}

populateDatabase().catch(console.error);

export default populateDatabase;
