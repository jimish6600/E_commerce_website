const addToCartModel = require("../../models/cartProduct");

const addToCartViewProduct = async(req,res)=>{
    try{
        const currentUser = req.userId
        console.log("heloo",currentUser)
        const allProduct = await addToCartModel.find({
            userID : currentUser
        }).populate("productId")

        res.json({
            data : allProduct,
            success : true,
            error : false
        })
    }catch(err) {
        res.status(400).json({
          message: err.message || err,
          error: true,
          success: false,
        });
    }
}

module.exports = addToCartViewProduct