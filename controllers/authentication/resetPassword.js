const createHttpError = require('http-errors');
const User = require('../../models/User.js');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

async function resetPassword(headers,body) {
//   token in header
        const {  newPassword } = body;
        const token = headers.authorization.split(" ")[1];
        console.log('token :>> ', token);
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            throw new createHttpError(401, "Invalid or expired token ");
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.loginAttempts = 0;
        user.lockUntil= null;
        delete user.resetPasswordToken;
        delete user.resetPasswordExpires;
        await user.save();
        return "user updated successfully";
}

module.exports = resetPassword;

