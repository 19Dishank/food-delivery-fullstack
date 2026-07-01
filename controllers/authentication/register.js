const createHttpError = require('http-errors');
const User = require('../../models/User.js');
const bcrypt = require('bcrypt');

async function register(body) {
    
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) { throw new createHttpError(400, "User already exists "); }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;

    const user = await User.create(body);
    const { password, ...userData } = user._doc;
    return userData;

}

module.exports = register;