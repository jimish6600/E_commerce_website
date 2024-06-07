const productModel = require("../../models/productModel")

const searchProduct = async(req,res) => {
    try{
        const query = req.query.q

        const regex = new RegExp(query,'i','g')

        const product = await productModel.find({
            "$or" : [
                {
                    productName :regex
                },
                {
                    category : regex
                }
            ]
        })

        res.status(201).json({
            data : product,
            message : "Search Product List",
            error : false,
            success : true
        })
    }catch(err) {
        res.status(400).json({
          message: err.message || err,
          error: true,
          success: false,
        })
    }
}

module.exports = searchProduct