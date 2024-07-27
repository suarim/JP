const express = require("express");
const {
  getApprovedSitesController,
  createApprovedSiteController,
  updateApprovedSiteController,
  getSuggestedSitesController,
  deleteSuggestedSiteController
} = require("../Controllers/adminControllers");

const router = express.Router();

// Route to get approved sites
router.get("/approved-sites", getApprovedSitesController);

// Route to create an approved site
router.post("/approved-sites", createApprovedSiteController);

// Route to update an approved site
router.put("/approved-sites/:id", updateApprovedSiteController);

// Route to get suggested sites
router.get("/suggested-sites", getSuggestedSitesController);

// Route to delete a suggested site
router.delete("/suggested-sites/:id", deleteSuggestedSiteController);

module.exports = router;