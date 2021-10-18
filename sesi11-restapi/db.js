const {Pool} = require('pg');

const db = new Pool({
  user: 'postgres',
  password: 'postgres',
  // Mau konek
  host: 'localhost',
  database: 'coba',
  port: 5432
});

module.exports = db;