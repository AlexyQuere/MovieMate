import { EntitySchema } from 'typeorm';

const Actor = new EntitySchema({
  name: 'Actor',
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
      type: 'many-to-many',
      target: 'Movie',
      inverseSide: 'actors',
      joinTable: true,
    },
  },
});

export default Actor;
