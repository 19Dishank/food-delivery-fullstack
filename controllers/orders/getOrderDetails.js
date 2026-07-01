const createHttpError = require('http-errors');
const Orders = require('../../models/Order');
const OrderItems = require('../../models/OrderItem');


async function getOrderDetails(params) {
    const orderId = params.id;
    console.log(orderId);
    const order = await Orders.findById(orderId).sort({ createdAt: -1 });
    if(!order){
        throw new createHttpError(404, "Order not found");
    }
    console.log('orders :>> ', order);

    const orderDetails = await OrderItems.find({orderId: orderId});   
    return {
        orderDetails    
    }
}
module.exports = getOrderDetails;