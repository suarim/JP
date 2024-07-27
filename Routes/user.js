const express = require("express")
const {fetchusercontroller} = require("../Controllers/userControllers.js")
const { protectRoute } = require("../middleware/authmiddleware.js")
const router = express.Router()
router.get("/",protectRoute,fetchusercontroller)

module.exports = router

//employee pushed data about site
//admin recieves data about the site
//fetch  products--admins
//add products--admins
//
