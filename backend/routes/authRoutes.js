const {Router} = require('express')
const {registerAdmin,loginAdmin,registerStudent,loginStudent,registerTeacher,loginTeacher}= require('../controller/authController')

const {checkForAuthenticationCookieOfAdmin} = require('../middleware/adminAuthMid')

const router = Router()


router.post('/AdminSignup',registerAdmin)
router.post('/AdminLogin',loginAdmin)

router.post('/TeacherSignup',checkForAuthenticationCookieOfAdmin('admin'),registerTeacher)
router.post('/TeacherLogin',loginTeacher)

router.post('/StudentSignup',checkForAuthenticationCookieOfAdmin('admin'),registerStudent)
router.post('/StudentLogin',loginStudent)

module.exports = router 