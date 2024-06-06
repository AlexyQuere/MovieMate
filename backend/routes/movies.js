import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
import Director from '../entities/directors.js';
import Actor from '../entities/actors.js';
import Genre from '../entities/genre.js';
const router = express.Router();

// Route to get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await appDataSource
      .getRepository(Movie)
      .find({ relations: ['genres', 'actors', 'director'] });
    res.json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while fetching movies' });
  }
});

// Route to get movies by genre
router.get('/genre/:genre', async (req, res) => {
  const genreName = req.params.genre;

  try {
    const genre = await appDataSource
      .getRepository(Genre)
      .findOne({ where: { name: genreName }, relations: ['movies'] });
    if (genre) {
      res.json({ movies: genre.movies });
    } else {
      res.status(404).json({ message: 'Genre not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while fetching movies by genre' });
  }
});

// Route to add a new movie
router.post('/', async (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const genreRepository = appDataSource.getRepository(Genre);
  const actorRepository = appDataSource.getRepository(Actor);
  const directorRepository = appDataSource.getRepository(Director);

  const {
    name,
    releasedate,
    image,
    globalrating,
    synopsis,
    genreIds,
    actorIds,
    directorId,
  } = req.body;

  try {
    const directors = await directorRepository.find({
      where: { id: directorId },
    });
    if (directors.length === 0) {
      res.status(404).json({ message: 'Director not found' });

      return;
    }
    const director = directors[0];

    const foundGenres = await genreRepository.findByIds(genreIds);
    if (foundGenres.length !== genreIds.length) {
      res.status(404).json({ message: 'One or more genres not found' });

      return;
    }

    const foundActors = await actorRepository.findByIds(actorIds);
    if (foundActors.length !== actorIds.length) {
      res.status(404).json({ message: 'One or more actors not found' });

      return;
    }

    const newMovie = movieRepository.create({
      name,
      releasedate,
      image,
      globalrating,
      synopsis,
      director,
      genres: foundGenres,
      actors: foundActors,
    });

    const savedMovie = await movieRepository.save(newMovie);

    res.status(201).json({
      message: 'Movie successfully added',
      id: savedMovie.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while creating the movie' });
  }
});
// Route to get random movies
router.get('/random', async (req, res) => {
  try {
    const movies = await appDataSource
      .getRepository(Movie)
      .find({ relations: ['genres', 'actors', 'director'] });
    const randomMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 10); // Sélectionner 10 films aléatoires
    res.json(randomMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while fetching random movies' });
  }
});

// Route pour mettre à jour le statut 'isliked' d'un film
router.post('/:id/like', async (req, res) => {
  const movieId = req.params.id;
  const { isLiked } = req.body;

  try {
    const movie = await appDataSource
      .getRepository(Movie)
      .findOne({ where: { id: movieId } });
    if (!movie) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }

    movie.isliked = isLiked;
    const updatedMovie = await appDataSource.getRepository(Movie).save(movie);

    res.status(200).json({
      message: 'Statut de like du film mis à jour avec succès',
      movie: updatedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour du statut de like du film',
    });
  }
});

// Route to get a movie by its ID
router.get('/:id', async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await appDataSource.getRepository(Movie).findOne({
      where: { id: movieId },
      relations: ['genres', 'actors', 'director'],
    });
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while fetching the movie' });
  }
});

// Route to delete a movie by its ID
router.delete('/:id', async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await appDataSource
      .getRepository(Movie)
      .findOne({ where: { id: movieId } });
    if (movie) {
      await appDataSource.getRepository(Movie).remove(movie);
      res.status(200).json({ message: 'Movie successfully deleted' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while deleting the movie' });
  }
});

export default router;
