async function authToken(req,res,next){
    try{
        console.log(req)
        const token =  req.cookies?.token || req.header

        console.log("token - ", token)
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}

module.exports = authToken