// routes/recommendations.js
import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

const router = express.Router();

// Route POST pour générer des recommandations basées sur les évaluations des utilisateurs
router.post('/', (req, res) => {
  const userRatings = req.body.ratings;
  const recommendationScript = path.resolve('./recommendation.py');

  // Écrire les évaluations utilisateur dans un fichier temporaire
  const tempFilePath = path.resolve('./user_ratings.json');
  fs.writeFileSync(tempFilePath, JSON.stringify(userRatings));

  console.log(
    `Appel du script: python3 ${recommendationScript} recommend ${tempFilePath}`
  );

  exec(
    `python3 ${recommendationScript} recommend ${tempFilePath}`,
    (error, stdout, stderr) => {
      // Supprimer le fichier temporaire après utilisation
      fs.unlinkSync(tempFilePath);

      if (error) {
        console.error(`Erreur: ${stderr}`);
        res.status(500).json({ error: stderr });

        return;
      }

      // Afficher le stdout pour diagnostiquer l'erreur de JSON
      console.log(`Output: ${stdout}`);

      try {
        const recommendations = JSON.parse(stdout);
        res.json(recommendations);
      } catch (parseError) {
        console.error(`Erreur de parsing: ${stdout}`); // Utilisez stdout ici pour voir ce qui est réellement retourné
        res
          .status(500)
          .json({ error: `Erreur de parsing: ${parseError.message}` });
      }
    }
  );
});

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

    const tempFilePath = path.resolve('./user_ratings.json');
    fs.writeFileSync(tempFilePath, JSON.stringify(userRatings));

    const recommendationScript = path.resolve('./recommendation.py');

    console.log(
      `Appel du script: python3 ${recommendationScript} recommend ${tempFilePath}`
    );

    exec(
      `python3 ${recommendationScript} recommend ${tempFilePath}`,
      (error, stdout, stderr) => {
        fs.unlinkSync(tempFilePath);

        if (error) {
          console.error(`Erreur: ${stderr}`);
          res.status(500).json({ error: stderr });

          return;
        }

        // Afficher le stdout pour diagnostiquer l'erreur de JSON
        console.log(`Output: ${stdout}`);

        try {
          const recommendations = JSON.parse(stdout);
          res.json(recommendations);
        } catch (parseError) {
          console.error(`Erreur de parsing: ${stdout}`); // Utilisez stdout ici pour voir ce qui est réellement retourné
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
