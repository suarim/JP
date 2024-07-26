const express = require("express")
const { registercontroller, logincontroller, logoutusercontroller, cookcontroller } = require("../Controllers/authControllers")
const router = express.Router()
router.post("/login",logincontroller) 
router.post("/register",registercontroller) 
router.post("/logout",logoutusercontroller) 
router.post("/cook",cookcontroller) 
module.exports = router
