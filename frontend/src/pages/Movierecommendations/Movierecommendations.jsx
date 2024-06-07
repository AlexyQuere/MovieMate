import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import './MovieRecommendations.css';

const MovieRecommendations = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [userRatings, setUserRatings] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [detailedRecommendations, setDetailedRecommendations] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const [currentRecommendationIndex, setCurrentRecommendationIndex] =
    useState(0);
  const [showMatchMessage, setShowMatchMessage] = useState(false);
  const [swipeAnimation, setSwipeAnimation] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/movies/random')
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleFeedback = (liked) => {
    const movieId = movies[currentMovieIndex].id;
    const animation = liked ? 'swipe-right' : 'swipe-left';

    setSwipeAnimation(animation);

    setUserRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: liked,
    }));

    axios
      .post('http://localhost:8000/feedback', { movieId, liked })
      .then(() => {
        setTimeout(() => {
          if (currentMovieIndex + 1 < movies.length) {
            setCurrentMovieIndex(currentMovieIndex + 1);
            setSwipeAnimation('');
          } else {
            getRecommendations();
          }
        }, 500);
      })
      .catch((error) => {
        console.error('Error sending feedback:', error);
      });
  };

  const getRecommendations = () => {
    setIsLoadingRecommendations(true);
    axios
      .get('http://localhost:8000/recommendations')
      .then(async (response) => {
        const recommendations = response.data;
        setRecommendations(recommendations);

        const detailedRecommendationsPromises = recommendations.map((rec) =>
          axios.get(`http://localhost:8000/movies/${rec.id}`)
        );

        const detailedRecommendationsResponses = await Promise.all(
          detailedRecommendationsPromises
        );
        const detailedRecommendationsData =
          detailedRecommendationsResponses.map((res) => res.data);

        setDetailedRecommendations(detailedRecommendationsData);
        setIsLoadingRecommendations(false);

        setShowMatchMessage(true);
        setTimeout(() => {
          setShowMatchMessage(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
        setIsLoadingRecommendations(false);
      });
  };

  const handleNextRecommendation = () => {
    setCurrentRecommendationIndex(
      (prevIndex) => (prevIndex + 1) % detailedRecommendations.length
    );
  };

  if (isLoadingRecommendations) {
    return (
      <div className="message">
        <h1>It's a match ! </h1>
      </div>
    );
  }

  if (
    currentMovieIndex >= movies.length - 1 &&
    detailedRecommendations.length > 0
  ) {
    const currentRecommendation =
      detailedRecommendations[currentRecommendationIndex];

    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div key={currentRecommendation.id} style={{ marginBottom: '20px' }}>
          <a href={`http://localhost:3000/movies/${currentRecommendation.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/original/${currentRecommendation.image}`}
              alt={currentRecommendation.name}
              style={{
                width: '350px',
                height: '500px',
                borderRadius: '4%',
                marginTop: '4rem',
              }}
            />
          </a>
        </div>
        <AutorenewIcon
          className="responsive-button"
          onClick={handleNextRecommendation}
        />
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {movies.length > 0 && currentMovieIndex < movies.length && (
        <div
          className={swipeAnimation}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1>{movies[currentMovieIndex].name}</h1>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original/${movies[currentMovieIndex].image}`}
              alt={movies[currentMovieIndex].name}
              style={{ width: '300px', height: '450px', borderRadius: '4%' }}
            />
            <div
              style={{
                margin: '3rem',
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                className="thumb-icon-container"
                onClick={() => handleFeedback(false)}
              >
                <ThumbDownIcon style={{ fontSize: '2.5rem', color: 'white' }} />
              </div>
              <div
                className="thumb-icon-container"
                onClick={() => handleFeedback(true)}
              >
                <ThumbUpIcon style={{ fontSize: '2.5rem', color: 'white' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRecommendations;
