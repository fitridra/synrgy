"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.
const config = {
    // development: {
    //   client: 'sqlite3',
    //   connection: {
    //     filename: './dev.sqlite3',
    //   },
    // },
    // staging: {
    //   client: 'postgresql',
    //   connection: {
    //     database: 'my_db',
    //     user: 'username',
    //     password: 'password',
    //   },
    //   pool: {
    //     min: 2,
    //     max: 10,
    //   },
    //   migrations: {
    //     tableName: 'knex_migrations',
    //   },
    // },
    development: {
        client: 'postgresql',
        connection: {
            port: 5433,
            database: 'app_server_ch8',
            user: 'app_server_ch8',
            password: 'YLP7GE6qjWXpNHy',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
    staging: {
        client: 'postgresql',
        connection: {
            database: 'postgres',
            user: 'postgres',
            password: 'docker',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
    production: {
        client: 'postgresql',
        connection: {
            database: 'postgres',
            user: 'postgres',
            password: 'docker',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};
module.exports = config;
