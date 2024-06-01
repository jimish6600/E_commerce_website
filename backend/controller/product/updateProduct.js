const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
  try {
    const { _id, ...resBody } = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

    res.status(201).json({
      message: "Product update successfully",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateProductController;
