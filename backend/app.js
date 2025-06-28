const express = require('express')
const cors  = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const {pool} = require('./dataBase')
const app = express()
const PORT = 8000;

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).json({ error: err.message });
});

const {checkForAuthenticationCookieOfAdmin}= require('./middleware/adminAuthMid')

const authRoutes = require('./routes/authRoutes')
const adminRoutes= require('./routes/adminRoutes')
app.use('/api/auth',authRoutes)
app.use('/api/admin',checkForAuthenticationCookieOfAdmin('admin'),adminRoutes)





app.get('/',checkForAuthenticationCookieOfAdmin('admin'),(req,res)=>{
    getUsers(req,res)
})




const getUsers = (request, response) => {
  pool.query(`SELECT * FROM students `, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})