const express = require("express")
const { createproduct, getallproducts, getproductbyid } = require("../Controllers/productcontroller")
const router = express.Router()
router.post('/create',createproduct)
router.get('/',getallproducts)
router.get('/:id',getproductbyid)
module.exports = router