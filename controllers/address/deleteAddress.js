const createHttpError = require('http-errors');
const Address = require('../../models/Address.js');

async function deleteAddress(params, user) {
    const address = await Address.findByIdAndDelete(params.id);
    console.log('address :>> ', address);
    if (!address) {
        throw new createHttpError(404, "address not found");
    }
    return address
}
module.exports = deleteAddress;