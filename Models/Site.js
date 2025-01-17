const mongoose = require("mongoose");
const validator = require("validator");

const siteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default:"model"
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    approved:{
        type:Boolean,
        required:true,
        default:false
    },
    attended:{
        type:Boolean,
        default:false
    }

});

const Site = mongoose.model("Site", siteSchema);
module.exports = Site;
