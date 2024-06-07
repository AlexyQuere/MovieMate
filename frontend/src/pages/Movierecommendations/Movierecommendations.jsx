// src/pages/MovieRecommendations/MovieRecommendations.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieRecommendations = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [userRatings, setUserRatings] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);

  useEffect(() => {
    // Récupérer une liste aléatoire de films au chargement du composant
    axios
      .get('http://localhost:8000/movies/random')
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des films:', error);
      });
  }, []);

  const handleFeedback = (liked) => {
    const movieId = movies[currentMovieIndex].id;

    // Mettre à jour les évaluations de l'utilisateur
    setUserRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: liked,
    }));

    // Envoyer le feedback à l'API
    axios
      .post('http://localhost:8000/feedback', { movieId, liked })
      .then(() => {
        if (currentMovieIndex + 1 < movies.length) {
          // Passer au film suivant
          setCurrentMovieIndex(currentMovieIndex + 1);
        } else {
          // Si tous les films ont été notés, demander des recommandations
          getRecommendations();
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du feedback:", error);
      });
  };

  const getRecommendations = () => {
    setIsLoadingRecommendations(true);
    axios
      .get('http://localhost:8000/recommendations')
      .then((response) => {
        setRecommendations(response.data);
        setIsLoadingRecommendations(false);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des recommandations:',
          error
        );
        setIsLoadingRecommendations(false);
      });
  };

  if (isLoadingRecommendations) {
    return <div>Génération des recommandations...</div>;
  }

  if (currentMovieIndex >= movies.length - 1 && recommendations.length > 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Vos recommandations</h1>
        <ul>
          {recommendations.map((rec) => (
            <li key={rec.id}>
              {rec.name} - Score: {rec.score}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Recommandations de Films</h1>
      {movies.length > 0 && currentMovieIndex < movies.length && (
        <div>
          <h2>{movies[currentMovieIndex].name}</h2>
          <img
            src={movies[currentMovieIndex].image}
            alt={movies[currentMovieIndex].name}
            style={{ width: '300px', height: '450px' }}
          />
          <div style={{ margin: '20px' }}>
            <button
              onClick={() => handleFeedback(true)}
              style={{ marginRight: '10px' }}
            >
              J'aime
            </button>
            <button onClick={() => handleFeedback(false)}>Je n'aime pas</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRecommendations;
