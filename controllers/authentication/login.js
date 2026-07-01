const User = require('../../models/User.js');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

async function login(body) {
    const { email, password } = body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new createHttpError(404, 'User Not Found'); //user not found

    if (user.lockUntil && user.lockUntil > Date.now()) {
        // if (moment().isAfter(moment(user.lockUntil))) {
        throw new createHttpError(400, `User account is locked until ${user.lockUntil} `);
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= 3) {
            user.lockUntil = Date.now() + (24 * 60 * 60 * 1000);
        }
        await user.save();
        throw new createHttpError(401, `password do not match ,  ${3 - user.loginAttempts} login attempts left, else account will be locked for 24 hours`)  //unauthenticated as password do not match 
    }

    user.loginAttempts = 0;
    user.lockUntil = null;

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES });

    const refreshtoken = jwt.sign({ _id: user._id }, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });
    user.refreshToken = refreshtoken;
    await user.save();
    return {
        accessToken: token,
        refreshtoken,
        _id: user._id,
        role: user.role,
        phoneNumber: user.phoneNumber,
    }
}
module.exports = login;