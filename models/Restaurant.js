const mongoose = require('mongoose');
const addressSchema = require('./Address');

// detail of restaurant
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Restaurant name is required "],
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, " Restaurant contact number is required "],
        trim: true,
        maxlength: 10
    },
    openingTime: {
        type: String,
        required: [true, "Restaurant opening time is required"],
    },
    closingTime: {
        type: String,
        required: [true, "Restaurant closing time is required"],
    }
}, { timestamps: true })


module.exports = mongoose.model('restaurant', restaurantSchema);