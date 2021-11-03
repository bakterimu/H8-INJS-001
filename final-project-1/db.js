const {Pool} = require('pg');

const db = new Pool({
  user: 'postgres',
  password: 'postgres',
  // Mau konek
  host: 'localhost',
  database: 'project-1',
  port: 5432
});

module.exports = db;