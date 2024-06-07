import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

const router = express.Router();

// Route GET pour obtenir des recommandations basées sur les feedbacks de l'utilisateur
router.get('/', async (req, res) => {
  try {
    const movies = await appDataSource.getRepository(Movie).find();
    const userRatings = {};
    movies.forEach((movie) => {
      if (movie.isliked !== null) {
        userRatings[movie.id] = movie.isliked;
      }
    });

    if (Object.keys(userRatings).length === 0) {
      return res.status(400).json({
        error:
          'Aucun feedback utilisateur trouvé pour générer des recommandations.',
      });
    }

    const recommendationScript = path.resolve('./recommendation.py');
    const userRatingsString = JSON.stringify(userRatings);

    exec(
      `python3 ${recommendationScript} recommend '${userRatingsString}'`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur: ${stderr}`);
          res.status(500).json({ error: stderr });

          return;
        }

        try {
          const recommendations = JSON.parse(stdout);
          res.json(recommendations);
        } catch (parseError) {
          console.error(`Erreur de parsing: ${stdout}`);
          res
            .status(500)
            .json({ error: `Erreur de parsing: ${parseError.message}` });
        }
      }
    );
  } catch (error) {
    console.error('Erreur lors de la génération des recommandations:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
