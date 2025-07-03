require('dotenv').config({ path: '../.env' })

const JWT = require("jsonwebtoken")

const secretAdmin = 'parhadaasas'
const secretTeacher =  'parhadxdcsdaasas'
const secretStudent = 'parhadaasffsdfeferwdwas'

function createTokenForAdmin(user){
   const payload={ 
    admin_name:user.admin_name,
    role:'admin'
}    
    const token = JWT.sign(payload,secretAdmin) 
    return token 
}

function validateTokenForAdmin(token){
    const payload =  JWT.verify(token,secretAdmin)
    return payload
}

//Teacher

function createTokenForTeacher(user){
   const payload={ 
    teacher_name:user.name,
    role:'teacher'
}    
    const token = JWT.sign(payload,secretTeacher) 
    return token 
}

function validateTokenForTeacher(token){
    const payload =  JWT.verify(token,secretTeacher)
    return payload
}

//Student
function createTokenForStudent(user){
   const payload={ 
   Student_name:user.name,
   role:'student'
   
}    
    const token = JWT.sign(payload,secretStudent) 
    return token 
}

function validateTokenForStudent(token){
    const payload =  JWT.verify(token,secretStudent)
    return payload
}


module.exports  = {
    createTokenForAdmin,
    validateTokenForAdmin,

    createTokenForTeacher,
    validateTokenForTeacher,
    
    createTokenForStudent,
    validateTokenForStudent,


}