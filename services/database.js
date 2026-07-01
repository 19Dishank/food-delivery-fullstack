const createHttpError = require('http-errors');
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb Database connected !");
    } catch(error) {
      throw new createHttpError(error)
    }
}
module.exports = {
    connectDB
}