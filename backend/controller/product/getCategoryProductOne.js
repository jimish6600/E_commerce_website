const productModel = require("../../models/productModel");

const getCategoryProduct = async(req,res) =>{
    try{
        const productCategory = await productModel.distinct("category")

        // array to store one product form each category
        const productByCategory = []

        for(const category of productCategory){
            const product = await productModel.findOne({category })

            if(product){
                productByCategory.push(product)
            }
        }

        // console.log("productCategory",productByCategory)
        res.status(201).json({
            message: "Category product",
            data : productByCategory,
            error: false,
            success: true
          });
    }catch(err) {
        res.status(400).json({
          message: err.message || err,
          error: true,
          success: false,
        });
    }
}

module.exports = getCategoryProduct