import express from 'express';
import { appDataSource } from '../datasource.js';
import Actor from '../entities/actors.js';

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
    .findOne({ where: { id: actorId }, relations: ['movies'] })
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

// Route to create a new actor
router.post('/', (req, res) => {
  const actorRepository = appDataSource.getRepository(Actor);
  const { name } = req.body;

  const newActor = actorRepository.create({
    name,
  });

  actorRepository
    .save(newActor)
    .then((savedActor) => {
      res.status(201).json({
        message: 'Actor successfully created',
        actor: savedActor,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while creating the actor' });
    });
});

// Route to associate an actor with a movie
router.post('/:actorId/movies/:movieId', (req, res) => {
  const actorRepository = appDataSource.getRepository(Actor);
  const actorId = req.params.actorId;
  const movieId = req.params.movieId;

  actorRepository
    .findOne(actorId)
    .then((actor) => {
      if (!actor) {
        res.status(404).json({ message: 'Actor not found' });
      } else {
        actor.movies.push(movieId);
        actorRepository
          .save(actor)
          .then(() => {
            res
              .status(200)
              .json({ message: 'Movie associated with actor successfully' });
          })
          .catch((error) => {
            console.error(error);
            res
              .status(500)
              .json({ message: 'Error while associating movie with actor' });
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching the actor' });
    });
});

export default router;
