const bcrypt = require('bcrypt');
const {createAdmin,findAdminByUsernameAndMatchPasswords}= require('../models/adminModels.js')
const {validateTokenForAdmin,createTokenForAdmin} = require('../services/auth.js')

registerAdmin = async(req,res) =>{
    const {username,userEmail,password} = req.body
    try{
        const user = await createAdmin(username,userEmail,password)
        if(user.error) return res.status(401).json({error:user.error})      

        const token = createTokenForAdmin(user)
        res.cookie('admin', token);
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
        if(result.error) return res.status(401).json({error:'Login Failed'}) 
        console.log('result',result)
        const token = createTokenForAdmin(result)

        res.cookie('admin',token);
        res.status(200).json({sucess:token})



    }catch(err){
        console.log(err)
        res.status(500).json({error:'Login Failed'})        
    }
}


module.exports= {
    registerAdmin,
    loginAdmin
}