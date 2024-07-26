const asyncHandler = require("express-async-handler");
const User = require("../Models/User.js");

const fetchusercontroller = async (req,res)=>{

    const user = req.user
    res.status(200).json({user})
}

module.exports = {fetchusercontroller}