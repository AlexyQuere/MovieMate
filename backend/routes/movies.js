// Import necessary modules
import express from 'express';
import { Like } from 'typeorm';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies2.js';

// Create a new router
const router = express.Router();

// Route to get all movies
router.get('/', (req, res) => {
  appDataSource
    .getRepository(Movie)
    .find({})
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
  const genre = req.params.genre;

  appDataSource
    .getRepository(Movie)
    .find({ where: { genre: Like(`%${genre}%`) } })
    .then((movies) => {
      res.json({ movies: movies });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching movies by genre' });
    });
});

// Route to add a new movie
router.post('/new', (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  console.log(req.body);
  const newMovie = movieRepository.create({
    name: req.body.name,
    date: req.body.date,
    image: req.body.image,
    genre: req.body.genre,
    rating: req.body.rating,
  });

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
      res.status(500).json({ message: 'Error while creating the movie' });
    });
});

// Route to get a movie by its ID
router.get('/:id', (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const movieId = req.params.id;

  movieRepository
    .findOneBy({ id: movieId })
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
    .findOneBy({ id: movieId })
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
