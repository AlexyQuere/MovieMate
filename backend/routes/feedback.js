// routes/feedback.js
import express from 'express';
import axios from 'axios';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { movieId, liked } = req.body;

  try {
    // Envoyer une requête POST à l'API pour mettre à jour le statut du film
    const response = await axios.post(
      `http://localhost:8000/movies/${movieId}/like`,
      {
        isLiked: liked,
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Erreur: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Route GET pour récupérer tous les feedbacks utilisateur
router.get('/', async (req, res) => {
  try {
    // Exemple : récupération des films likés par l'utilisateur
    const likedMovies = await appDataSource
      .getRepository(Movie)
      .find({ where: { isliked: true } });
    res.status(200).json(likedMovies);
  } catch (error) {
    console.error('Erreur lors de la récupération des feedbacks:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
