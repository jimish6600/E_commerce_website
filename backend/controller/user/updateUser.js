const takePermission = require("../../helpers/permission")
const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try{
        const sessionUser = req.userId

        const {userId,role,email,name} = req.body 
        
        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role})
        }

        if(!takePermission(sessionUser)){
            throw new Error("You are not admin")
        }
        const user = await userModel.findById(sessionUser)

        const updateUserDetails = await userModel.findByIdAndUpdate(userId,payload)

        res.json({
            data : updateUserDetails,
            message : "User Updated",
            success : true,
            error : false
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
} 

module.exports = updateUser