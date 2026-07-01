const createHttpError = require('http-errors');
const Address = require('../../models/Address.js');

async function updateAddress(params, user, body) {
    const address = await Address.findByIdAndUpdate(params.id, { $set: body }, { new: true, runValidators: true });
    if (!address) {
        throw new createHttpError(404, "address not found");
    }
    return address;
}
module.exports = updateAddress;