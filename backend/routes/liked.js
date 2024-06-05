// Import necessary modules
import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
import Rating from '../entities/liked.js';

// Create a new router
const router = express.Router();

// Route to like or change the rating for a movie
router.post('/:movieId', (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const ratingRepository = appDataSource.getRepository(Rating);
  const movieId = req.params.movieId;
  const userId = req.body.userId;
  const ratingValue = req.body.rating;

  movieRepository
    .findOne(movieId)
    .then((movie) => {
      if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
      } else {
        // Check if the user has already rated the movie
        ratingRepository
          .findOne({ where: { movie: movieId, user: userId } })
          .then((existingRating) => {
            if (existingRating) {
              // If the user has already rated, update the rating
              existingRating.rating = ratingValue;
              ratingRepository
                .save(existingRating)
                .then(() => {
                  res.json({ message: 'Rating updated successfully' });
                })
                .catch((error) => {
                  console.error(error);
                  res
                    .status(500)
                    .json({ message: 'Error while updating rating' });
                });
            } else {
              // If the user has not rated, create a new rating
              const newRating = ratingRepository.create({
                user: userId,
                movie: movieId,
                rating: ratingValue,
              });
              ratingRepository
                .save(newRating)
                .then(() => {
                  res.json({ message: 'Rating added successfully' });
                })
                .catch((error) => {
                  console.error(error);
                  res
                    .status(500)
                    .json({ message: 'Error while adding rating' });
                });
            }
          })
          .catch((error) => {
            console.error(error);
            res
              .status(500)
              .json({ message: 'Error while checking existing rating' });
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching the movie' });
    });
});

export default router;
