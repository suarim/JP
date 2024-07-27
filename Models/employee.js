const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    mobile: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please fill a valid mobile number']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
