const express = require("express")
const {fetchusercontroller} = require("../Controllers/userControllers.js")
const { protectRoute } = require("../middleware/authmiddleware.js")
const router = express.Router()
router.get("/",protectRoute,fetchusercontroller)
module.exports = router