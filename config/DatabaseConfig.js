require('dotenv').config();
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'public',
  pool: { min: 0, max: 7 },
});

module.exports = db;
