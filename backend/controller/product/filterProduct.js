const productModel = require("../../models/productModel");

const filterProductController = async(req,res) => {
    try{
      const categoryList = req.body?.category || []
      console.log("jimish" , categoryList)
      const product = await productModel.find({
        category : {
          "$in" : categoryList
        }
      })
      console.log("jimish1" , product)
      res.json({
        data : product,
        message : 'product',
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

module.exports = filterProductController