const knex = require('knex');

const config = {
  development: {
    client: "pg",
    connection: 'postgres://postgres:docker@127.0.0.1:5432/db_cars', 
    searchPath: ['public'],
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
    seeds: { directory: "./seeds" },
  },
};

const environment = 'development';

module.exports = knex(config[environment]);
