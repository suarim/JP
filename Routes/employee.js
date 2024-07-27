// const express = require("express")
// // const { create, siteaddcontrolller, loginemployee, logoutemployee, cookcontroller } = require("../Controllers/employeecontroller.js")
// // const { protectRoute } = require("../middleware/authmiddleware.js")
// // const { protectRouteemployee } = require("../middleware/employeeMiddleware.js")
// // const { getApprovedSitesController } = require("../Controllers/siteControllers.js")
// const router = express.Router()
// //     router.post('/create',create)
// //     router.post('/login',loginemployee)
// //     router.post('/logout',logoutemployee)
// //     router.post('/cook',cookcontroller)
// //  router.post('/pushsite',protectRouteemployee,siteaddcontrolller)
// //  router.get('/getapproved',protectRouteemployee,getApprovedSitesController)



 
//  module.exports=router

const express = require("express");
const router = express.Router();
const { create, siteaddcontrolller, loginemployee, logoutemployee, cookcontroller } = require("../Controllers/employeecontroller.js")
const { protectRoute } = require("../middleware/authmiddleware.js")
const { protectRouteemployee } = require("../middleware/employeeMiddleware.js")
const { getApprovedSitesController } = require("../Controllers/siteControllers.js")


    router.get('/', (req, res) => {
        res.send('Test route is working!');
    });
    router.post('/create',create)
    router.post('/login',loginemployee)
    router.post('/logout',logoutemployee)
    router.post('/cook',cookcontroller)
    router.post('/pushsite',protectRouteemployee,siteaddcontrolller)
    router.get('/getapproved',protectRouteemployee,getApprovedSitesController)


module.exports = router;