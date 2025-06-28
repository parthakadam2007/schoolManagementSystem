const {Router} = require('express')
const router = Router()

const {createStudentController,getUsers} = require('../controller/adminController')


router.post("/StudentsEdit",createStudentController)
router.get('/getAllStudents',getUsers)
// router.post("/TeachersEdit",createTeacher)

// router.put("/StudentsEdit",editStudent)
// router.put("/TeachersEdit",editTeacher)

// router.delete("/StudentsEdit",deleteStudent)
// router.delete("/TeachersEdit",deleteTeacher)

module.exports = router