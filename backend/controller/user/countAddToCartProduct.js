const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async(req,res) =>{
    try{
        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userID : userId
        })

        res.json({
            data : {
                count: count
            },
            message : "OK",
            error : false,
            success : true
        })
    }catch(err) {
        res.status(400).json({
          message: err.message || err,
          error: true,
          success: false,
        });
    }
}

module.exports = countAddToCartProduct