import jwt from "jsonwebtoken"
import User from "../Models/User.js";
export const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({err:"not logged in"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({err:"invalid token"})
        }
        console.log(decoded)
        const user = await User.findById(decoded.userid)
        req.user = user
        console.log(user._id)
        console.log(token)
        next()
    } catch (error) {
        res.status(500).json({error:"internal servhkkger error"})
    }
}
