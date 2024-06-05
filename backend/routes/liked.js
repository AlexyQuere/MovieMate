// Import necessary modules
import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
import Rating from '../entities/liked.js';

// Create a new router
const router = express.Router();

// Route to like or change the rating for a movie
router.post('/:movieId', async (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const ratingRepository = appDataSource.getRepository(Rating);
  const movieId = req.params.movieId;
  const userId = req.body.userId;
  const likeValue = req.body.Like;

  try {
    // Find the movie
    const movie = await movieRepository.findOneBy({ id: movieId });
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });

      return;
    }

    // Find the existing like for the user and movie
    const existingLike = await ratingRepository.findOneBy({
      movie: { id: movieId },
      user: { id: userId },
    });

    if (existingLike) {
      // If the user has already liked, update the like
      existingLike.Like = likeValue; // Changed from rating to like
      await ratingRepository.save(existingLike);
      res.json({ message: 'Like updated successfully' }); // Changed from Rating to Like
    } else {
      // If the user has not liked, create a new like
      const newLike = ratingRepository.create({
        user: { id: userId },
        movie: { id: movieId },
        Like: likeValue, // Ensure the 'Like' field is properly set
      });
      await ratingRepository.save(newLike);
      res.json({ message: 'Like added successfully' }); // Changed from Rating to Like
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while updating/adding like' }); // Changed from Rating to Like
  }
});

export default router;
