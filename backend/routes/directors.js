// Import necessary modules
import express from 'express';
import { appDataSource } from '../datasource.js';
import Director from '../entities/director.js';

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
    .findOne({ where: { id: directorId } })
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

export default router;
