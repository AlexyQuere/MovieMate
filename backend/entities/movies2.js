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
    date: {
      type: Date,
    },
    image: {
      type: String,
    },
    genre: {
      type: 'simple-array',
    },
    rating: {
      type: Number,
    },
  },
});

export default Movie;
