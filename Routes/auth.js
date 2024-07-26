const express = require("express")
const { registercontroller, logincontroller } = require("../Controllers/authControllers")
const router = express.Router()
router.post("/login",logincontroller) 
router.post("/register",registercontroller) 
module.exports = router
