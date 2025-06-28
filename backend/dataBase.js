const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'schoolSystem',
  password: '1234',
  port: 5432,
})
const bcrypt = require('bcrypt');

module.exports= {
    pool,
    bcrypt
}