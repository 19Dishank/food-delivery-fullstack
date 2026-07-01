const createHttpError = require('http-errors');
const Address = require('../../models/Address.js');


async function getAllAddress(user) {
    const userId = user._id;
    const addresses = await Address.find({ userId: userId });
    return addresses;

}
module.exports = getAllAddress;