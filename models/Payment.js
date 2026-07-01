const mongoose = require('mongoose');
const paymentConstants = require('../constants/payment.constants');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true
    },
    orderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "order",
        required: true,
        unique:true
    },
    amount:{
        type: Number,
        required: true
    },
    mode: {
        type: String,
        enum: Object.values(paymentConstants.MODE),
        lowercase: true,
        trim: true,
        required: true 
    },
    status: {
        type: String,
        enum: Object.values(paymentConstants.STATUS),
        default: "pending",
        lowercase: true,
        trim: true,
        required: true
    }  
}, { timestamps: true })

module.exports = mongoose.model('payment', paymentSchema);
