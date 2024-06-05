// Import necessary modules
import express from 'express';
import { appDataSource } from '../datasource.js';
import Director from '../entities/directors.js';
import Movie from '../entities/movies.js';

// Create a new router
const router = express.Router();

// Route to get all directors
router.get('/', (req, res) => {
  appDataSource
    .getRepository(Director)
    .find()
    .then((directors) => {
      res.json({ directors: directors });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching directors' });
    });
});

// Route to get a director by their ID
router.get('/:id', (req, res) => {
  const directorRepository = appDataSource.getRepository(Director);
  const directorId = req.params.id;

  directorRepository
    .findOne({ where: { id: directorId }, relations: ['movies'] })
    .then((director) => {
      if (director) {
        res.status(200).json(director);
      } else {
        res.status(404).json({ message: 'Director not found' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching the director' });
    });
});

// Route to create a new director
router.post('/', (req, res) => {
  const directorRepository = appDataSource.getRepository(Director);
  const { name } = req.body;

  const newDirector = directorRepository.create({
    name,
  });

  directorRepository
    .save(newDirector)
    .then((savedDirector) => {
      res.status(201).json({
        message: 'Director successfully created',
        director: savedDirector,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while creating the director' });
    });
});

// Route to associate a director with a movie
router.post('/:directorId/movies/:movieId', async (req, res) => {
  const directorRepository = appDataSource.getRepository(Director);
  const movieRepository = appDataSource.getRepository(Movie);
  const directorId = req.params.directorId;
  const movieId = req.params.movieId;

  try {
    const director = await directorRepository.findOne(directorId);
    const movie = await movieRepository.findOne(movieId);

    if (!director || !movie) {
      res.status(404).json({ message: 'Director or Movie not found' });

      return;
    }

    movie.director = director;
    await movieRepository.save(movie);

    res
      .status(200)
      .json({ message: 'Director associated with movie successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error while associating director with movie' });
  }
});

export default router;
