const createHttpError = require('http-errors');
const User = require('../../models/User.js');
const bcrypt = require('bcrypt');

async function changePassword(body, loggedInUser) {

    const { currentPassword, newPassword } = body;

    const user = await User.findById(loggedInUser._id).select('+password');

    const isMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isMatched) {
        throw new createHttpError(401, "current password is incorrect , unauthorized user ");
    }    
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    // user.lastPasswordChangedAt = //asdasd; add this feature
    await user.save();

    return user.updatedAt;

}
module.exports = changePassword;

