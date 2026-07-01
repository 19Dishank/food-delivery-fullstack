const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "please enter Category name"],
        lowercase: true,
        trim: true,
        unique: [true , "categories should be unique"]
    },
    description : {
        type: String,
        lowercase: true,
        trim: true
    },
    parentId :{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category",
        default: null ,
        index:true
    }
}, { timestamps: true })

module.exports = mongoose.model('category', categorySchema);