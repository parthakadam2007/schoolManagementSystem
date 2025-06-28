const {Router} = require('express')
const {registerAdmin}= require('../controller/authController')

const router = Router()


router.post('/AdminSignup',registerAdmin)
router.get('/test',(req,res)=>{
    res.json({suss:"you are on test"})
})

module.exports = router 