const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    createToken : async(data) =>{
        const secret = process.env.SECRET
        try {
        let token = await jwt.sign(data, secret, {expiresIn: '5s'});
        return token;
        } catch (error){
            console.log(error)
        }
    },

    verifyToken : (token) =>{

    }
}