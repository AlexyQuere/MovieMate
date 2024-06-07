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

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/movies', moviesRouter);
    app.use('/actors', actorsRouter);
    app.use('/directors', directorsRouter);
    app.use('/genres', genreRouter);
    app.use('/recommendations', recommendationsRouter);
    app.use('/feedback', feedbackRouter);

    app.use(routeNotFoundJsonHandler);
    app.use(jsonErrorHandler);

    const port = parseInt(process.env.PORT || '8000');

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
