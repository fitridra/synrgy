const knex = require('knex');

const config = {
  development: {
    client: "pg",
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'docker',
      database: 'db_cars',
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
    seeds: { directory: "./seeds" },
  },
};

const environment = 'development';

module.exports = config[environment];
