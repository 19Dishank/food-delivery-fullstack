const createHttpError = require('http-errors');
const Address = require('../../models/Address.js');


async function addAddress(user, body) {
    const userId = user._id;
    console.log(body);
    const existing = await Address.findOne({ userId: userId, ...body })
    if (existing) {
        throw new createHttpError(400, "address already exists");
    }
    const address = await Address.create({ userId: userId, ...body });
    return address;

}
module.exports = addAddress;