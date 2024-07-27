const jwt = require('jsonwebtoken');
const Employee = require('../Models/employee.js');

const protectRouteemployee = async (req, res, next) => {
    try {
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

        // Attach the user to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle any errors that occur
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { protectRouteemployee };
