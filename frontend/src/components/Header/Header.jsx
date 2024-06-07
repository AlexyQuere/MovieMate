import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Linkhome" to="/">
        MovieMate
      </Link>

      <div className="links">
        <Link className="Link" to="/">
          HOME
        </Link>

        <Link className="Link" to="/movies">
          DISCOVER
        </Link>

        <Link className="Link" to="/recommendations">
          FIND YOUR MOVIE
        </Link>
      </div>
    </div>
  );
};

export default Header;
