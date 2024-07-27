const jwt = require('jsonwebtoken');
const Employee = require('../Models/employee.js');

const adminmiddleware = async (req, res, next) => {
    try {
        console.log("In middleware");
        
        // Extract the token from cookies
        const token = req.cookies.jwtemployee;
        
        // Check if token exists
        if (!token) {
            return res.status(401).json({ error: "Not logged in" });
        }
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the token is valid
        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Find the employee by ID and exclude the password field
        const user = await Employee.findById(decoded.userid).select("-password");

        // Check if user is found
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        console.log("Token:", token);
        console.log("End");
        console.log("Admin status:", user.admin);

        // Check if the user is an admin
        if (user.admin) {
            // Attach the user to the request object
            req.user = user;
            next();
        } else {
            console.log("Unauthorized access attempt");
            return res.status(401).json({ error: "Unauthorized" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { adminmiddleware };