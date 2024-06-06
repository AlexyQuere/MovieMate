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
    isliked: {
      type: Boolean,
      nullable: true,
    },
  },
  relations: {
    genres: {
      type: 'many-to-many',
      target: 'Genre',
      inverseSide: 'movies',
    },
    actors: {
      type: 'many-to-many',
      target: 'Actor',
      inverseSide: 'movies',
    },
    director: {
      type: 'many-to-one',
      target: 'Director',
      inverseSide: 'movies',
    },
  },
});

export default Movie;
