// Import necessary modules
import express from 'express';
import { appDataSource } from '../datasource.js';
import Actor from '../entities/actor.js';

// Create a new router
const router = express.Router();

// Route to get all actors
router.get('/', (req, res) => {
  appDataSource
    .getRepository(Actor)
    .find()
    .then((actors) => {
      res.json({ actors: actors });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching actors' });
    });
});

// Route to get an actor by their ID
router.get('/:id', (req, res) => {
  const actorRepository = appDataSource.getRepository(Actor);
  const actorId = req.params.id;

  actorRepository
    .findOne({ where: { id: actorId } })
    .then((actor) => {
      if (actor) {
        res.status(200).json(actor);
      } else {
        res.status(404).json({ message: 'Actor not found' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching the actor' });
    });
});

export default router;
