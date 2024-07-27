// const express = require("express");
// const router = express.Router();


// // Health check route
// router.get("/", (req, res) => {
//   return res.status(200).json({ message: "Admin API is working" });
// });

// module.exports = router;


const express = require("express");
const {
  getApprovedSitesController,
  createApprovedSiteController,
  updateApprovedSiteController,
  getSuggestedSitesController,
  deleteSuggestedSiteController
} = require("../Controllers/siteControllers");

const router = express.Router();

// Health check route
  router.get("/", (req, res) => {
    res.status(200).json({ message: "Admin API is working" });
  });

// Route to get approved sites
router.get("/approved-sites", getApprovedSitesController);

// Route to create an approved site
router.post("/approved-sites", createApprovedSiteController);

// Route to update an approved site
router.patch("/approved-sites/:id", updateApprovedSiteController);

// Route to get suggested sites
router.get("/suggested-sites", getSuggestedSitesController);

// Route to delete a suggested site
router.delete("/suggested-sites/:id", deleteSuggestedSiteController);

module.exports = router;