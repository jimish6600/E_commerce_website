const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req,res) =>{
    try{
        const {productId} = req?.body
        const currentUser = req.userId

        if(!currentUser){
            throw new Error("Please Login")
        }
        const isProductAvailable = await addToCartModel.findOne({productId, userID : currentUser})
        if(isProductAvailable){
            throw new Error("Already exits in Add to cart")
        }
        const payload = {
            productId : productId,
            quantity : 1,
            userID : currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        res.json({
            data : saveProduct,
            message : "Product added in cart",
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


module.exports = addToCartController