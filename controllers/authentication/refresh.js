const User = require('../../models/User.js');
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

async function refresh(headers) {
    const token = headers.authorization.split(" ")[1];
    console.log('token :>> ', token);
    if (!token) throw new createHttpError(401, "No refresh token is present");

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new createHttpError(403, "Refresh token expired");
        } else if (error.name === 'JsonWebTokenError') {
            throw new createHttpError(401, "Invalid refresh token");
        } else {
            throw error;
        }
    }
    
    const user = await User.findOne({ _id: decoded._id, refreshToken: token });
    if (!user) throw new createHttpError(401, "Refresh token not valid ");
    const newRefreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
    );


       const newAccessToken = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES });

    user.refreshToken = newRefreshToken;
    await user.save();

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
}

module.exports = refresh;