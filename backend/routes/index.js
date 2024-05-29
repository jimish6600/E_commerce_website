const express = require('express')

const router = express.Router()

const unseSingUpController = require("../controller/userSignUp")
const userSignInController = require('../controller/userSignin')
const authToken = require('../middleware/authToken')
const userDetailsController = require('../controller/userDetails')

router.post("/signup",unseSingUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken, userDetailsController)

module.exports = router