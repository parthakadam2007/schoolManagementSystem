require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  // user: 'postgres',
  // host: 'localhost',
  // database: 'schoolSystem',
  // password: '1234',
  // port: 5432,
  //   host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // port: process.env.DB_PORT,
  connectionString: process.env.DATABASE_URL, // for Heroku or other platforms
  ssl: { rejectUnauthorized: false } // required for Supabase
})
const bcrypt = require('bcrypt');
console.log(`Database connected on port ${process.env.DATABASE_URL}`)
module.exports= {
    pool,
    bcrypt
}