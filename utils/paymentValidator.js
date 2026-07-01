const { body, param } = require("express-validator");
const paymentConstants = require('../constants/payment.constants');


const processPaymentValidation = [
    param("paymentId")
        .trim().notEmpty().withMessage("payment id is required")
        .isMongoId().withMessage("Not a valid payment id"),
    body("status")
        .trim().notEmpty().withMessage("payment status is required")
        .isIn(Object.values(paymentConstants.STATUS)).withMessage("Not a valid payment status")
]

const particularPaymentValidation = [
    param("orderId")
        .trim().notEmpty().withMessage("order id is required")
        .isMongoId().withMessage("Not a valid order id"),
]

module.exports = {
    processPaymentValidation,
    particularPaymentValidation
}
