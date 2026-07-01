const createHttpError = require('http-errors');
const Orders = require('../../models/Order');
const orderConstants = require('../../constants/order.constants');

async function cancelOrder(params) {
    const orderId = params.id;

    const order = await Orders.findById(orderId);
    if (!order) { throw new createHttpError(404, "Order not found ") }

    const allowedStatus = [orderConstants.PENDING, orderConstants.CONFIRMED];
    console.log('allowedStatus :>> ', allowedStatus.includes(order.status), order.status);
    if (!allowedStatus.includes(order.status)) {
        throw new createHttpError(400, `order cannot be cancelled as it is ${order.status}`);
    }
    order.status = orderConstants.CANCELLED;
    await order.save();
    console.log('order :>> ', order);
    return order;
}
module.exports = cancelOrder;