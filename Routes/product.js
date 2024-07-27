const express = require("express")
const { createproduct, getallproducts, getproductbyid } = require("../Controllers/productcontroller")
const { protectRouteemployee } = require("../middleware/employeeMiddleware")
const { adminmiddleware } = require("../middleware/adminmiddleware")
const router = express.Router()
router.post('/create',adminmiddleware,createproduct)
router.get('/',adminmiddleware,getallproducts)
router.get('/:id',adminmiddleware,getproductbyid)
module.exports = router