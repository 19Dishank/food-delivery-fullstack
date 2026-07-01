const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    totalAmount: {
        type: Number,
        min: 0,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('cart', cartSchema);
