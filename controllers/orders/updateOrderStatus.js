const createHttpError = require('http-errors');
const Orders = require('../../models/Order');
const orderConstants = require('../../constants/order.constants.js');

async function updateOrderStatus(params, body){
    console.log('params, body  :>> ', params, body );
    const newStatus = body.status;
    const order = await Orders.findById(params.id);
    if(!order){ throw new createHttpError(404 , "order not found ");}
    const allowedTransition = {
       [ orderConstants.PENDING] : [orderConstants.CONFIRMED , orderConstants.CANCELLED]    ,
       [orderConstants.CONFIRMED] : [orderConstants.PREPARING , orderConstants.CANCELLED],
       [orderConstants.PREPARING] : [orderConstants.OUT_FOR_DELIVERY],
       [orderConstants.OUT_FOR_DELIVERY]: [orderConstants.DELIVERED],
       [orderConstants.DELIVERED]: [],
       [orderConstants.CANCELLED]: []
    }

    if(!(Object.values(orderConstants).includes(newStatus))){
        throw new createHttpError(400 , "cannot update as Invalid order status is passed in body");
    }

    const currentStatus = order.status;
    const transition  = allowedTransition[currentStatus] ; //finding allowed transition of the current order status. (transition is an array of allowed new status )

    if(!(transition.includes(newStatus))){ throw new createHttpError(400, `Cannot update status from ${currentStatus}  to ${newStatus}`)}

    order.status = newStatus;
    await order.save();
    return order;
    
}
module.exports = updateOrderStatus;