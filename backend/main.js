
require('dotenv').config();
const express = require('express')
const cors  = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const {pool} = require('./dataBase')
const app = express()
const PORT = process.env.PORT || 8000;
console.log(`Database connected on port ${process.env.DB_PORT}`)

app.use(cors({
  origin:'http://localhost:5173',
   credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.json())

app.use(express.json()); // ✅ parses JSON
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


app.get('/',(req,res)=>{
  res.json({hello:'hello world'})
})


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})