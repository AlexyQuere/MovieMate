import React, { useEffect, useState } from 'react';
import './Moviegenrecheckbox.css'; // Import the CSS file

const CheckboxExample = ({ setCheckedValue }) => {
  const [genres, setGenres] = useState([]);
  const [checkedValues, setCheckedValues] = useState({});

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:8000/genres');
        const data = await response.json();
        console.log('Fetched genres:', data.genres); // Log the fetched data
        if (Array.isArray(data.genres)) {
          setGenres(data.genres);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));

    if (checked) {
      setCheckedValue(name);
    } else {
      setCheckedValue(null);
    }
  };

  return (
    <div className="checkbox-container">
      <h1>Genre</h1>
      <div className="checkbox-list">
        {Array.isArray(genres) ? (
          genres.map((genre) => (
            <div key={genre.id}>
              <input
                type="checkbox"
                id={genre.name}
                name={genre.name}
                checked={!!checkedValues[genre.name]}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={genre.name}>{genre.name}</label>
            </div>
          ))
        ) : (
          <div>No genres available</div>
        )}
      </div>
    </div>
  );
};

export default CheckboxExample;
