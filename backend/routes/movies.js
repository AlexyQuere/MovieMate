// Import necessary modules
import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
import Genre from '../entities/genre.js';
import Actor from '../entities/actors.js';
import Director from '../entities/directors.js';

// Create a new router
const router = express.Router();

// Route to get all movies
router.get('/', (req, res) => {
  appDataSource
    .getRepository(Movie)
    .find({ relations: ['genres', 'actors', 'director'] })
    .then((movies) => {
      res.json({ movies: movies });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching movies' });
    });
});

// Route to get movies by genre
router.get('/genre/:genre', (req, res) => {
  const genreName = req.params.genre;

  appDataSource
    .getRepository(Genre)
    .findOne({ where: { name: genreName }, relations: ['movies'] })
    .then((genre) => {
      if (genre) {
        res.json({ movies: genre.movies });
      } else {
        res.status(404).json({ message: 'Genre not found' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching movies by genre' });
    });
});

// Route to add a new movie
router.post('/', async (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const genreRepository = appDataSource.getRepository(Genre);
  const actorRepository = appDataSource.getRepository(Actor);
  const directorRepository = appDataSource.getRepository(Director);

  const {
    name,
    releasedate,
    image,
    globalrating,
    synopsis,
    genreIds,
    actorIds,
    directorId,
  } = req.body;

  try {
    // Find director
    const directors = await directorRepository.find({
      where: { id: directorId },
    });
    if (directors.length === 0) {
      res.status(404).json({ message: 'Director not found' });

      return;
    }
    const director = directors[0];

    // Find genres
    const foundGenres = await genreRepository.findByIds(genreIds);
    if (foundGenres.length !== genreIds.length) {
      res.status(404).json({ message: 'One or more genres not found' });

      return;
    }

    // Find actors
    const foundActors = await actorRepository.findByIds(actorIds);
    if (foundActors.length !== actorIds.length) {
      res.status(404).json({ message: 'One or more actors not found' });

      return;
    }

    // Create new movie
    const newMovie = movieRepository.create({
      name,
      releasedate,
      image,
      globalrating,
      synopsis,
      director,
      genres: foundGenres,
      actors: foundActors,
    });

    // Save movie
    const savedMovie = await movieRepository.save(newMovie);

    res.status(201).json({
      message: 'Movie successfully added',
      id: savedMovie.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while creating the movie' });
  }
});

// Route to get a movie by its ID
router.get('/:id', (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const movieId = req.params.id;

  movieRepository
    .findOne({
      where: { id: movieId },
      relations: ['genres', 'actors', 'director', 'ratings'],
    })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching the movie' });
    });
});

// Route to delete a movie by its ID
router.delete('/:id', (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const movieId = req.params.id;

  movieRepository
    .findOne({ where: { id: movieId } })
    .then((movie) => {
      if (movie) {
        movieRepository
          .remove(movie)
          .then(() => {
            res.status(200).json({ message: 'Movie successfully deleted' });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Error while deleting the movie' });
          });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching the movie' });
    });
});

// Route to toggle the isliked option for a movie
router.patch('/liked/:id', async (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const movieId = req.params.id;

  try {
    // Find the movie by id
    const movie = await movieRepository.findOne({ where: { id: movieId } });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Toggle the isliked property
    movie.isliked = !movie.isliked;

    // Save the updated movie
    const updatedMovie = await movieRepository.save(movie);

    res.status(200).json({
      message: 'Movie like status successfully updated',
      movie: updatedMovie,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error while updating the movie like status' });
  }
});

export default router;
