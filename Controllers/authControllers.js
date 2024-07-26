const asyncHandler = require("express-async-handler");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { generatetoken } = require("../utils.js");

const logincontroller = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    let user = await User.findOne({ email });
    if(user){
        const match = await bcrypt.compare(password,user.password)
        user = await User.findOne({ email }).select("-password");
        if(match){
            token = generatetoken(user._id,res)
            res.status(200).json({message:"signed in successfully",token,user})
        }
        else{
        res.status(404).json({error:"invalid password or email"})

        }
    }
    else{
        res.status(404).json({error:"invalid password or email"})
    }
    
})

const registercontroller = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, profilePic, mobile } = req.body;


    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "Use a stronger password" });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profilePic,
        mobile,
    });

    await newUser.save();
    token = generatetoken(newUser._id,res)
    user={
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        mobile: newUser.mobile,
       
    }
    res.status(201).json({user,token});
});

 const logoutusercontroller=async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({"message":"logged out succesfully"})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

 const cookcontroller = async(req,res)=>{
    console.log(req.cookies)
    res.json(req.cookies)
}
module.exports =  {logincontroller,registercontroller,logoutusercontroller,cookcontroller}