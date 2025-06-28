const bcrypt = require('bcrypt');
const {createAdmin}= require('../models/adminModels.js')
const {validateTokenForAdmin,createTokenForAdmin} = require('../services/auth.js')

registerAdmin = async(req,res) =>{
    const {username,userEmail,password} = req.body
    try{
        const user = await createAdmin(username,userEmail,password)
        if(user.error) res.status(409).json({error:user.error})      

        const token = createTokenForAdmin(user)
        res.cookie('admin', token);
        res.status(200).json({sucess:token})


    }catch(err){
        console.log(err)
        res.status(500).json({error:'Registration Failed'})
    }
}



module.exports= {
    registerAdmin
}