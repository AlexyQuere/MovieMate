import { EntitySchema } from 'typeorm';

const Director = new EntitySchema({
  name: 'Director',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    name: {
      type: String,
    },
  },
  relations: {
    movies: {
      type: 'one-to-many',
      target: 'Movie',
      inverseSide: 'director',
    },
  },
});

export default Director;
