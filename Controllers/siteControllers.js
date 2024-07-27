const Site = require("../Models/Site");

// Controller to get approved sites where attended is false
const getApprovedSitesController = async (req, res) => {
    try {
        const sites = await Site.find({ approved: true, attended: false });
        res.status(200).json(sites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to create a new site
const createApprovedSiteController = async (req, res) => {
    const { user, longitude, latitude } = req.body;
    const newSite = new Site({
        user,
        longitude,
        latitude,
        approved: true
    });

    try {
        const savedSite = await newSite.save();
        res.status(201).json(savedSite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to update a site based on its ID
const updateApprovedSiteController = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      // Find the site by ID and update with the provided fields
      const updatedSite = await Site.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedSite) {
        return res.status(404).json({ message: "Approved site not found" });
      }
  
      res.status(200).json(updatedSite);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

// Controller to get suggested sites where approved is false and attended is false
const getSuggestedSitesController = async (req, res) => {
    try {
        const sites = await Site.find({ approved: false, attended: false });
        res.status(200).json(sites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to delete a suggested site based on its ID
const deleteSuggestedSiteController = async (req, res) => {
    const { id } = req.params;

    try {
        await Site.findByIdAndDelete(id);
        res.status(200).json({ message: "Site deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getApprovedSitesController,
    createApprovedSiteController,
    updateApprovedSiteController,
    getSuggestedSitesController,
    deleteSuggestedSiteController
};