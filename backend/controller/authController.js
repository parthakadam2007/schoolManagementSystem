const bcrypt = require('bcrypt');
const {createAdmin,findAdminByUsernameAndMatchPasswords}= require('../models/adminModels.js')
const {createTeacher, findTeacherByUsernameAndMatchPasswords} = require('../models/teacherModels.js')
const {createStudent,findStudentByUsernameAndMatchPasswords} = require('../models/studentModels')
const {createTokenForAdmin,createTokenForStudent,createTokenForTeacher} = require('../services/auth.js')



registerAdmin = async(req,res) =>{
    console.log('--->',req.body)

    const {username,userEmail,password} = req.body
    try{
        const user = await createAdmin(username,userEmail,password)
        console.log('user---->',user)
        if(user?.error) return res.status(401).json({error:user.error})      

        const token = createTokenForAdmin(user)
        res.cookie('admin', token,{
            httpOnly:true,
            secure:true,
            sameSite:'None'
        });
        res.status(200).json({sucess:token})


    }catch(err){
        console.log(err)
        res.status(500).json({error:'Registration Failed'})
    }
}

loginAdmin = async(req,res)=>{
    const {email,password} = req.body
    try{
        const result = await findAdminByUsernameAndMatchPasswords(email,password)
        console.log("reslult",result)
        if(result.error) return res.status(401).json({error:'Login Failed'}) 
        console.log('result',result)
        const token = createTokenForAdmin(result)

        res.cookie('admin',token,{
            httpOnly:true,
            secure:true,
            sameSite:'None'
        });
        res.status(200).json({sucess:token})

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Login Failed'})        
    }
}

//teacher

registerTeacher = async(req,res) =>{
    const {username,userEmail,password,prn,year_joined} = req.body
    console.log({username,userEmail,password,prn,year_joined})
    try{
        const user = await createTeacher(prn,username, userEmail, password,year_joined)
        if(user.error) return res.status(500).json({error:user.error}) 
        
            res.cookie('teacher', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
});

        const token = createTokenForTeacher(user)
        res.status(200).json({sucess:token})


    }catch(err){
        console.log(err)
        res.status(500).json({error:'Registration Failed'})
    }
}

loginTeacher = async(req,res)=>{
    const {email,password} = req.body
    try{
        const result = await findTeacherByUsernameAndMatchPasswords(email,password)
        if(result.error) return res.status(401).json({error:'Login Failed'}) 
        console.log('result',result)
        const token = createTokenForTeacher(result)

        res.cookie('teacher',token,{
            httpOnly:true,
            secure:true,
            sameSite:'None'
        });
        res.status(200).json({sucess:token})

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Login Failed'})        
    }
}
//student

registerStudent = async(req,res) =>{
    const {prn,username,userEmail,password,roll_no,year_joined,division_id,branch_id} = req.body
    try{
        const user = await createStudent(prn,username,userEmail,password,roll_no,year_joined,division_id,branch_id)
        if(user.error) return res.status(401).json({error:user.error})      

        const token = createTokenForStudent(user)
        res.cookie('student', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
}); 

        res.status(200).json({sucess:token})


    }catch(err){
        console.log(err)
        res.status(500).json({error:'Registration Failed'})
    }
}

loginStudent = async(req,res)=>{
    const {email,password} = req.body
    try{
        const result = await findStudentByUsernameAndMatchPasswords(email,password)
        if(result.error) return res.status(401).json({error:'Login Failed'}) 
        console.log('result',result)
        const token = createTokenForStudent(result)

        res.cookie('student',token, {
  httpOnly: true,       // good security practice
  secure: true,         // required if SameSite=None
  sameSite: 'None',     // needed for cross-origin
});
        res.status(200).json({sucess:token})

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Login Failed'})        
    }
}


module.exports= {
    registerAdmin,
    loginAdmin,

    registerTeacher,
    loginTeacher,

    registerStudent,
    loginStudent
}