const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
    // type: //
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        index:true
    },
    addressDetail: {
        type: String,
        required: [true, "address detail like flat no , building name required "],
        lowercase: true,
        trim: true
    },
    street: {
        type: String,
        required: [true, "street details required"],
        lowercase: true,
        trim: true
    },
    landmark: {
        type: String,
        lowercase: true,
        trim: true
    },
    pincode: {
        type: String,
        required: [true, "pincode is required"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "city is required"],
        lowercase: true,
        trim: true
    },
    label: {
        type: String,
        lowercase: true,
        trim: true
    }
}, { timestamps: true })
module.exports = mongoose.model('address', addressSchema);
// Google Address autocomplete --> 