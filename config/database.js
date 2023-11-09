const knex = require('knex');
const config = require('../config/knexfile');

const environment = 'development';

const database = knex(config[environment]);

module.exports = database;
