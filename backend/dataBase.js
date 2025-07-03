const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'schoolSystem',
  password: '1234',
  port: 5432,
  //   host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // port: process.env.DB_PORT
})
const bcrypt = require('bcrypt');

module.exports= {
    pool,
    bcrypt
}