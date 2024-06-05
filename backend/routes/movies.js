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
router.post('/', (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const genreRepository = appDataSource.getRepository(Genre);
  const actorRepository = appDataSource.getRepository(Actor);
  const directorRepository = appDataSource.getRepository(Director);

  const { name, date, image, rating, genres, actors, directorId } = req.body;

  // Find director
  directorRepository
    .findOne({ id: directorId })
    .then((director) => {
      if (!director) {
        throw new Error('Director not found');
      }

      // Create new movie
      const newMovie = movieRepository.create({
        name,
        date,
        image,
        rating,
        director,
      });

      // Add genres
      genreRepository
        .findByIds(genres)
        .then((foundGenres) => {
          newMovie.genres = foundGenres;

          // Add actors
          actorRepository
            .findByIds(actors)
            .then((foundActors) => {
              newMovie.actors = foundActors;

              // Save movie
              movieRepository
                .save(newMovie)
                .then((savedMovie) => {
                  res.status(201).json({
                    message: 'Movie successfully added',
                    id: savedMovie.id,
                  });
                })
                .catch((error) => {
                  console.error(error);
                  res
                    .status(500)
                    .json({ message: 'Error while creating the movie' });
                });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({ message: 'Error while finding actors' });
            });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: 'Error while finding genres' });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while finding director' });
    });
});

// Route to get a movie by its ID
router.get('/:id', (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const movieId = req.params.id;

  movieRepository
    .findOne({
      where: { id: movieId },
      relations: ['genres', 'actors', 'director'],
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

export default router;
