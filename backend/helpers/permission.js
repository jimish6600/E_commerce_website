const userModel = require("../models/userModel");

const takePermission = async(userId)=>{
    const user = await userModel.findById(userId)

    if(user.role === 'ADMIN'){
        return true
    }

    return false
}

module.exports = takePermission