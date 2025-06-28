require('dotenv').config({ path: '../.env' })

const JWT = require("jsonwebtoken")

const secret = process.env.jwt_secret || 'parhadaasas'

function createTokenForAdmin(user){
   const payload={ 
    admin_name:user.admin_name
}    
console.log("payload",payload)
    const token = JWT.sign(payload,secret) 
    return token 
}

function validateTokenForAdmin(token){
    const payload =  JWT.verify(token,secret)
    return payload
}

module.exports  = {
    createTokenForAdmin,
    validateTokenForAdmin
}