import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../Moviecard/Moviecard';
import './Movie_list_by_genre.css';

const Movie_list_by_genre = ({ checkedValue }) => {
  const [movies, setMovies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [checkedValue]);

  const filteredMovies = movies.filter(
    (movie) =>
      movie.name && movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextClick = () => {
    setStartIndex(startIndex + 6);
  };

  const handlePrevClick = () => {
    setStartIndex(Math.max(0, startIndex - 6));
  };

  return (
    <div className="presentation">
      <div className="search">
        <svg
          fill="#ffffff"
          height="200px"
          width="200px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 488.4 488.4"
          xml:space="preserve"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <g>
              {' '}
              <g>
                {' '}
                <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>{' '}
              </g>{' '}
            </g>{' '}
          </g>
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
      <div className="pagination">
        {startIndex > 0 && (
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
        {filteredMovies.length > startIndex + 6 && (
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
    </div>
  );
};

export default Movie_list_by_genre;
