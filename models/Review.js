const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true
    },
    foodItemId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "food-item",
        required: true
    },
    orderId: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: "order",
        required: true,
    },
    reviewText: {
        type: String,
        lowercase: true,
        trim: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, { timestamps: true })

reviewSchema.index({ userId: 1, orderId: 1, foodItemId: 1 }, { unique: true });

module.exports = mongoose.model('review', reviewSchema);
