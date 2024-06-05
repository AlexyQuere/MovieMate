// Import necessary modules
import express from 'express';
import { appDataSource } from '../datasource.js';
import Genre from '../entities/genre.js';

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

export default router;
