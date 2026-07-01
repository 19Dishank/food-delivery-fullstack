const createHttpError = require('http-errors');
const Payment = require('../../models/Payment');




async function particularPayment(params){

   const {orderId} = params;
   const payment = await Payment.findOne({orderId});
   if(!payment){ throw new createHttpError(404, "payment details of this order not found ");}
   
   return payment;
}

module.exports = particularPayment;