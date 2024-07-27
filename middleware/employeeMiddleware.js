const jwt = require('jsonwebtoken');

const User  = require("../Models/User.js");
const Employee = require('../Models/employee.js');
const protectRouteemployee = async (req,res,next)=>{
    try {
        console.log("in middle ware")
        const token = req.cookies.jwtemployee
        if(!token){
            return res.status(401).json({err:"not logged in"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({err:"invalid token"})
        }
    
        const user = await Employee.findById(decoded.userid).select("-password")
        req.user = user
      
        console.log("token->",token)
        console.log("end")
        next()
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = {protectRouteemployee}
