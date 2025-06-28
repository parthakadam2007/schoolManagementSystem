const { response } = require('express');
const {createStudent}= require('../models/createStudent.js')

const createStudentController = (req,res)=>{

    const {prn,name,email,password,roll_no,year_joined,division_id,branch_id} = req.body;
    try{
        createStudent
        response  = createStudent(prn,name,email,password,roll_no,year_joined,division_id,branch_id)
        if(response.error) res.status(409).json({error:response.error})

        res.status(200).json({response:response})

    }catch(err){
         res.status(500).json({error:err})
    }
    
}


module.exports = {
    createStudentController
}