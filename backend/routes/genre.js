// Import necessary modules
import express from 'express';
import { appDataSource } from '../datasource.js';
import Genre from '../entities/genre.js';
import Movie from '../entities/movies.js';

// Create a new router
const router = express.Router();

// Route to get all genres
router.get('/', (req, res) => {
  appDataSource
    .getRepository(Genre)
    .find()
    .then((genres) => {
      res.json({ genres: genres });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching genres' });
    });
});

// Route to get a genre by its name
router.get('/:name', (req, res) => {
  const genreName = req.params.name;

  appDataSource
    .getRepository(Genre)
    .findOne({ where: { name: genreName } })
    .then((genre) => {
      if (genre) {
        res.json({ genre: genre });
      } else {
        res.status(404).json({ message: 'Genre not found' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching genre' });
    });
});

// Route to create a new genre
router.post('/', (req, res) => {
  const genreRepository = appDataSource.getRepository(Genre);
  const { name } = req.body;

  const newGenre = genreRepository.create({
    name,
  });

  genreRepository
    .save(newGenre)
    .then((savedGenre) => {
      res.status(201).json({
        message: 'Genre successfully created',
        genre: savedGenre,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while creating the genre' });
    });
});

// Route to associate a genre with a movie
router.post('/:genreId/movies/:movieId', async (req, res) => {
  const genreRepository = appDataSource.getRepository(Genre);
  const movieRepository = appDataSource.getRepository(Movie);
  const genreId = req.params.genreId;
  const movieId = req.params.movieId;

  try {
    const genre = await genreRepository.findOne(genreId);
    const movie = await movieRepository.findOne(movieId);

    if (!genre || !movie) {
      res.status(404).json({ message: 'Genre or Movie not found' });

      return;
    }

    movie.genres.push(genre);
    await movieRepository.save(movie);

    res
      .status(200)
      .json({ message: 'Genre associated with movie successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error while associating genre with movie' });
  }
});

export default router;
