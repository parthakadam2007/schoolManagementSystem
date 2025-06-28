const {Router} = require('express')
const {registerAdmin,loginAdmin}= require('../controller/authController')

const router = Router()


router.post('/AdminSignup',registerAdmin)
router.post('/AdminLogin',loginAdmin)

// router.post('/TeacherSignup',registerTeacher)

module.exports = router 