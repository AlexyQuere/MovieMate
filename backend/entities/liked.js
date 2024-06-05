import { EntitySchema } from 'typeorm';

const liked = new EntitySchema({
  name: 'Rating',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    Like: {
      type: Boolean,
      nullable: false,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
      nullable: false,
    },
    movie: {
      type: 'many-to-one',
      target: 'Movie',
      joinColumn: true,
      nullable: false,
    },
  },
});

export default liked;
