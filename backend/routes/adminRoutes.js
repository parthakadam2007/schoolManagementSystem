const {Router} = require('express')
const router = Router()

const {createStudentController,getUsers,handleEditStudent,handleFindStudent} = require('../controller/adminController')


router.post("/StudentsEdit",createStudentController)
router.get('/getAllStudents',getUsers)
router.put("/StudentsEdit/:studentPRN",handleEditStudent)
router.get("/StudentsEdit/:studentPRN",handleFindStudent)
// router.post("/TeachersEdit",createTeacher)

// router.put("/TeachersEdit",editTeacher)

// router.delete("/StudentsEdit",deleteStudent)
// router.delete("/TeachersEdit",deleteTeacher)

module.exports = router