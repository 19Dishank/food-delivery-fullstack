const mongoose = require('mongoose');
const orderConstants = require('../constants/order.constants');
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true
    },
    status: {
        type: String,
        enum: Object.values(orderConstants),
        default: orderConstants.PENDING,
        lowercase: true,
        trim: true
    },
    netAmount: {
        type: Number,
        required: true,
        min: 0
    },
    taxAmount: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    address: {
        type:  Object,
        required: [true , "address during checkout is required"]
    },
    orderInstructions: {
    type: String,
    lowercase: true,
    trim: true,
    default:''
}
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema);

