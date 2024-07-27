const mongoose = require("mongoose");
const validator = require("validator");

const siteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
});

const Site = mongoose.model("Site", siteSchema);
module.exports = Site;
