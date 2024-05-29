const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');


async function userSignInController(req,res){
    try{
        const {email , password} = req.body

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide email")
        }

        const user = await userModel.findOne({email})

        if(!user){
            throw new Error("User not found")
        }

        const checkPassword = await bcrypt.compare(password,user.password)

        if(checkPassword){
            const tokenData = {
                _id : user._id,
                email : user.email
            }
            const token =jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const tokenOption = {
                httpOnly : true,
                secure : true
            }
            res.cookie("token",token,tokenOption).status(200).json({
                message : "Login successfully",
                data : token,
                success : true,
                error : false
            })
        }else{
            throw new Error("Password is not match")
        }

        console.log("check password", checkPassword)
    }catch(error){
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = userSignInController