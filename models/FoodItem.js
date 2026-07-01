const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter food item name "],
        unique: true,
        lowercase: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Food item price is required"],
        default: 0
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category",
        required: [true, "please specify the food item category"]
    },
    isVeg: {
        type: Boolean,
        required: [true, "please specify the item is veg/non veg"]
    },
    availableTime: {
        type: [String],
        required: [true, "please enter food item availability"],
        enum: ["breakfast", "lunch", "dinner"]
    },
    isAvailable: {
        type: Boolean,
        required: [true, "please enter food item availability"],
        default: true
    },
    isTodaySpecial: {
        type: Boolean,
        default: false
    },
    images: {
        type: [String],
        required: [true, "atleast one food image is required"]
    }
}, { timestamps: true })
module.exports = mongoose.model('food-item', foodItemSchema);

