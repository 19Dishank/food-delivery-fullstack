const { body, param } = require("express-validator");
const paymentConstants = require('../constants/payment.constants');

const placeOrderValidation = [
    body("addressId")
        .trim().notEmpty().withMessage("address id is required")
        .isMongoId().withMessage("Not a valid address id"),
    body("orderInstructions")
        .optional()
        .notEmpty().withMessage("Order instruction cannot be empty")
        .isString().withMessage("order instruction must be string ")
        .toLowerCase(),
    body("paymentMode")
        .trim().notEmpty().withMessage("payment mode is required for placing order")
        .isIn(Object.values(paymentConstants.MODE)).withMessage("Not a valid payment mode")
]




const updateOrderStatusValidation = [
    param("id")
        .trim().notEmpty().withMessage("order id is required to update specific order")
        .isMongoId().withMessage("order id passed in paramas is not a valid id "),
    body("status")
        .trim().notEmpty().withMessage("Status to be updated is required")
        .isIn(Object.values(require('../constants/order.constants'))).withMessage("Not a valid order status to update")
]

module.exports = {
    placeOrderValidation,
    updateOrderStatusValidation
}
