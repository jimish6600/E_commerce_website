const express = require("express");

const router = express.Router();

const unseSingUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignin");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/user/userDetails");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProductOne = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/allToCart");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");

router.post("/signup", unseSingUpController);
router.post("/signin", userSignInController);

router.get("/user-details", authToken, userDetailsController);

// //admin panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// //product
router.post("/upload-product", uploadProductController);
router.get("/get-products", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProductOne);
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search-product",searchProduct)
router.post("/filter-product",filterProductController)

// user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-cart-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)
module.exports = router;