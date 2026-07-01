const createHttpError = require('http-errors');
const Users = require('../../models/User.js');

async function getUserDetails(loggedInUser) {
        const user = await Users.findById(loggedInUser._id);
        console.log(user);
        if(!user) return createHttpError(404, "user not found ");
        return user;
}

module.exports = getUserDetails;