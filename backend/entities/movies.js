import { EntitySchema } from 'typeorm';

const Movie = new EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    name: {
      type: String,
    },
    releasedate: {
      type: Date,
    },
    image: {
      type: String,
    },
    globalrating: {
      type: Number,
      nullable: true,
    },
    synopsis: {
      type: String,
    },
  },
  relations: {
    genres: {
      type: 'many-to-many',
      target: 'Genre',
      inverseSide: 'movies',
      joinTable: true,
    },
    actors: {
      type: 'many-to-many',
      target: 'Actor',
      inverseSide: 'movies',
      joinTable: true,
    },
    director: {
      type: 'many-to-one',
      target: 'Director',
      inverseSide: 'movies',
    },
    ratings: {
      type: 'one-to-many',
      target: 'Rating',
      inverseSide: 'movie',
    },
  },
});

export default Movie;
