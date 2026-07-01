const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "cart",
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
        trim: true,
        lowercase: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "quantity must be atleast one"],
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true })
cartItemSchema.index(
  { cartId: 1, foodItemId: 1 },
  { unique: true }
);
module.exports = mongoose.model('cart-item', cartItemSchema);