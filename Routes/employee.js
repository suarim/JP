const express = require("express")
const { create, siteaddcontrolller, loginemployee, logoutemployee, cookcontroller } = require("../Controllers/employeecontroller.js")
const { protectRoute } = require("../middleware/authmiddleware.js")
const { protectRouteemployee } = require("../middleware/employeeMiddleware.js")
const router = express.Router()
    router.post('/create',create)
    router.post('/login',loginemployee)
    router.post('/logout',logoutemployee)
    router.post('/cook',cookcontroller)
 router.post('/pushsite',protectRouteemployee,siteaddcontrolller)
 module.exports=router