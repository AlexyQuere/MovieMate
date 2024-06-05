import { EntitySchema } from 'typeorm';

const Genre = new EntitySchema({
  name: 'Genre',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    name: {
      type: String,
      unique: true,
    },
  },
  relations: {
    movies: {
      type: 'many-to-many',
      target: 'Movie',
      inverseSide: 'genres',
      joinTable: true,
    },
  },
});

export default Genre;
