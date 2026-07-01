const mongoose = require("mongoose");
const addressSchema = require("./Address.js");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "please enter first name "],
        minlength: [3, "First Name must be at least 3 characters"],
        maxlength: [50, "Last Name cannot exceed 50 characters"],
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "please enter last name "],
        minlength: [3, "Last Name must be at least 3 characters"],
        maxlength: [50, "Last Name cannot exceed 50 characters"],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "please enter user email"],
        unique: [true, "email already registered"],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "email is not in proper format"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "password must be minimum 8 characters long "],
        trim: true,
        select: false
    },
    age: {
        type: Number,
        required: [true, "Age is required "],
        min: [10, "age must be atleast 10"],
        max: [125, "age cannot exceed 125"],
        validate: {
            validator: function (value) {
                return Number.isInteger(value)
            },
            message: props => `${props.value} is not a valid age`     //props.path = age
        }
    },
    phoneNumber: {
        type: String,
        required: [true, "phone number is required "],
        maxlength: [10, "phone number should be of 10 digits"],

    },
    role: {
        type: String,
        enum: ["customer", "restaurantOwner"],
        default: "customer",
        lowercase: true,
        trim: true
    },
    refreshToken: {
        type: String,
        default: null
    }
    ,
    resetPasswordToken: {
        type: String,
        default: null,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        select: false,
        default: null
    },
    loginAttempts: {
        type: Number,
        default: 0,
        required: true
    },
    lockUntil: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);