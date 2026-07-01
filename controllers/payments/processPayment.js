const createHttpError = require('http-errors');
const Payment = require('../../models/Payment');
const paymentConstants = require('../../constants/payment.constants');
const Order = require('../../models/Order');
const orderConstants = require('../../constants/order.constants');

async function processPayment(params,body){
   const {status} = body;
   const {paymentId} = params;
   const payment = await Payment.findById(paymentId);
   if(!payment){ throw new createHttpError(404, "payment not found ");}
   
   if(!(payment.status ===  paymentConstants.STATUS.PENDING)){ throw new createHttpError(400, "payment already processed");}
   payment.status = status;
   await payment.save();
   const order = await Order.findById(payment.orderId);
   console.log('order :>> ', order);
   if(status=== paymentConstants.STATUS.SUCCESS){
    order.status = orderConstants.CONFIRMED;
   }
   await order.save();
   return payment;
}

module.exports = processPayment;