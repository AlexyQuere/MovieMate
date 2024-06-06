// server.js
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import moviesRouter from './routes/movies.js';
import actorsRouter from './routes/actors.js';
import directorsRouter from './routes/directors.js';
import genreRouter from './routes/genre.js';
import recommendationsRouter from './routes/recommendations.js';
import feedbackRouter from './routes/feedback.js';

import { routeNotFoundJsonHandler } from './services/routeNotFoundJsonHandler.js';
import { jsonErrorHandler } from './services/jsonErrorHandler.js';
import { appDataSource } from './datasource.js';

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const app = express();

    app.use(logger('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Register routes
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/movies', moviesRouter); // Mise à jour pour gérer les films aléatoires
    app.use('/actors', actorsRouter);
    app.use('/directors', directorsRouter);
    app.use('/genres', genreRouter);
    app.use('/recommendations', recommendationsRouter);
    app.use('/feedback', feedbackRouter);

    // Register 404 middleware and error handler
    app.use(routeNotFoundJsonHandler); // Ce middleware doit être enregistré après toutes les routes pour gérer correctement les 404
    app.use(jsonErrorHandler); // Ce gestionnaire d'erreurs doit être enregistré après tous les middlewares pour capturer toutes les erreurs

    const port = parseInt(process.env.PORT || '8000');

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
