const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "order",
        required: true
    },
    foodItemId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "food-item",
        required: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "quantity must be atleast one"],
    },
    price: {
        type: Number,
        required: true
    },
    itemTotal: {
        type: Number,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('order-item', orderItemSchema);