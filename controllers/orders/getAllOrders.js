const createHttpError = require('http-errors');
const Orders = require('../../models/Order');

async function getAllOrders(user) {
    const userId = user._id;
    const orders = await Orders.find({ userId: userId }).sort({ createdAt: -1 });
    if(!orders){
        throw new createHttpError(404, "User has not placed any order yet ");
    }
    console.log('orders :>> ', orders);
    return {
        orders,
        orderCount: orders.length
    }
}

module.exports = getAllOrders;