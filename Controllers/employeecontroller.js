const asyncHandler = require("express-async-handler");
const Employee = require("../Models/employee");
const Site = require("../Models/Site");
const { generatetoken, generatetokenforemployee } = require("../utils");
const bcrypt = require("bcrypt");

const create = asyncHandler(async (req, res) => {
    const { name, age, email, mobile, password } = req.body;

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee
    const employee = new Employee({
        name,
        age,
        email,
        mobile,
        password: hashedPassword
    });

    // Generate token
    const token = generatetokenforemployee(employee._id, res);

    const createdEmployee = await employee.save();
    res.status(201).json({ createdEmployee, token });
});

const siteaddcontrolller = asyncHandler(async (req, res) => {
    const user = req.user;  // Correct variable name
    const { longitude, latitude } = req.body;
    const site = new Site({
        user: user._id,
        longitude,
        latitude
    });

    const createdsite = await site.save();
    res.status(201).json(createdsite);
});

const getapprovedsites=async (req,res)=>{
    const user = req.user
    const sites = await Site.find({ approved: true, attended: false });
    res.status(200).json(sites);
    
}

const loginemployee = asyncHandler(async (req, res) => {
    const {email,password} = req.body
    let user = await Employee.findOne({ email });
    if(user){
        const match = await bcrypt.compare(password,user.password)
        user = await Employee.findOne({ email }).select("-password");
        if(match){
            token = generatetokenforemployee(user._id,res)
            res.status(200).json({message:"signed in successfully",token,user})
        }
        else{
        res.status(404).json({error:"invalid password or email"})

        }
    }
    else{
        res.status(404).json({error:"invalid password or email"})
    }
});

const logoutemployee =  asyncHandler(async (req, res)=>{
    try {
        res.cookie("jwtemployee","",{maxAge:0});
        res.status(200).json({"message":"logged out succesfully"})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
})

const cookcontroller = async(req,res)=>{
    console.log(req.cookies)
    res.json(req.cookies)
}

module.exports = {
    create,
    siteaddcontrolller,logoutemployee,cookcontroller,
    loginemployee
};
