import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assurez-vous d'importer axios si vous l'utilisez
import Movie from '../Moviecard/Moviecard';
import './Movie_list_by_genre.css';

const Movie_list_by_genre = ({ checkedValue }) => {
  const [movies, setMovies] = useState([]);
  const [startIndex, setStartIndex] = useState(0); // Index du premier film à afficher
  const [searchTerm, setSearchTerm] = useState(''); // État pour le terme de recherche

  useEffect(() => {
    // Vérifiez si checkedValue est défini ou vide avant de faire la requête
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          checkedValue
            ? `http://localhost:8000/movies/genre/${checkedValue}`
            : 'http://localhost:8000/movies'
        );
        console.log(response);
        setMovies(response.data.movies || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
      }
    };

    fetchMovies();
  }, [checkedValue]);

  // Filtrer les films en fonction du terme de recherche
  const filteredMovies = movies.filter(
    (movie) =>
      // Vérifiez que le titre est défini avant d'appeler toLowerCase
      movie.name && movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour gérer le clic de l'icône pour afficher les films suivants
  const handleNextClick = () => {
    setStartIndex(startIndex + 6); // Incrémente l'index de 6
  };

  // Fonction pour gérer le clic de l'icône pour afficher les films précédents
  const handlePrevClick = () => {
    setStartIndex(Math.max(0, startIndex - 6)); // Décrémente l'index de 6, en s'assurant qu'il ne soit pas inférieur à 0
  };

  return (
    <div>
      <div className="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="50px"
          height="50px"
        >
          <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
        </svg>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="moviecardflex">
        {filteredMovies.slice(startIndex, startIndex + 6).map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
      {startIndex > 0 && ( // Afficher l'icône pour les films précédents si startIndex est supérieur à 0
        <svg
          onClick={handlePrevClick}
          fill="#000000"
          height="3rem"
          width="3rem"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xmlSpace="preserve"
          className="arrow-svg"
        >
          <path
            id="XMLID_6_"
            d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394
	c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998
	c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0
	c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z"
          />
        </svg>
      )}
      {filteredMovies.length > startIndex + 6 && ( // Afficher l'icône pour les films suivants si plus de films sont disponibles
        <svg
          onClick={handleNextClick}
          fill="#000000"
          height="3rem"
          width="3rem"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xmlSpace="preserve"
          className="arrow-svg"
        >
          <path
            id="XMLID_2_"
            d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M225.606,175.605
       l-80,80.002C142.678,258.535,138.839,260,135,260s-7.678-1.464-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213l69.393-69.396
       l-69.393-69.392c-5.858-5.857-5.858-15.355,0-21.213c5.857-5.858,15.355-5.858,21.213,0l80,79.998
       c2.814,2.813,4.394,6.628,4.394,10.606C230,168.976,228.42,172.792,225.606,175.605z"
          />
        </svg>
      )}
    </div>
  );
};

export default Movie_list_by_genre;
