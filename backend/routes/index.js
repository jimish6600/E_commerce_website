const express = require("express");

const router = express.Router();

const unseSingUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignin");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/user/userDetails");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProductOne = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");

router.post("/signup", unseSingUpController);
router.post("/signin", userSignInController);

router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// //admin panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// //product
router.post("/upload-product", uploadProductController);
router.get("/get-products", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProductOne);
router.post("/category-product",getCategoryWiseProduct)
module.exports = router;