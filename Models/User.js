const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        trim: true,
        validate: [validator.isEmail, 'Invalid email format']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    profilePic: {
        type: String,
        default: 'https://picsum.photos/150',
        required: [true, 'Profile picture is required'],
        validate: [validator.isURL, 'Invalid URL format']
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        minlength: [10, 'Mobile number must be at least 10 digits long'],
        maxlength: [15, 'Mobile number cannot exceed 15 digits']
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
