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
          width="30"
          height="30"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
        >
          <g transform="translate(-783 -563)">
            <path
              d="M868.5 638.6 856 626.1C854.3 624.4 852 623.8 849.8 624.2L845.4 619.8C849.3 614.8 851.6 608.4 851.6 601.6 851.6 585.1 838.1 571.6 821.6 571.6 805.1 571.6 791.6 585.1 791.6 601.6 791.6 618.1 805.1 631.6 821.6 631.6 828.4 631.6 834.7 629.3 839.8 625.4L844.2 629.8C843.8 632 844.4 634.3 846.1 636L858.6 648.5C860 649.9 861.8 650.6 863.6 650.6 865.4 650.6 867.2 649.9 868.6 648.5 871.2 645.7 871.2 641.3 868.5 638.6ZM821.5 625.5C808.3 625.5 797.5 614.7 797.5 601.5 797.5 588.3 808.3 577.5 821.5 577.5 834.7 577.5 845.5 588.3 845.5 601.5 845.5 614.7 834.7 625.5 821.5 625.5Z"
              fill="#FFFFFF"
            />
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
