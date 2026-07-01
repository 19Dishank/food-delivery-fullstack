const { body, param } = require("express-validator")

const addToCart = [
    body("foodItemId")
        .trim().notEmpty().withMessage("Food item id is requried ")
        .isMongoId().withMessage("Food item id is not a valid mongoID"),
    body("quantity")
        .exists().withMessage("food item quantity is a required feild ")
        .isInt({ min: 1 }).withMessage("Minimum 1 quantity is to be added to cart")
]

const updateCart = [
    param("id")
        .trim().notEmpty().withMessage("cartItem id is required to update")
        .isMongoId().withMessage("CartItem id is not a valid id "),
    body("quantity")
        .exists().withMessage("food item quantity is a required feild ")
        .isInt().withMessage("quantity should be an integer ")
]

module.exports = { addToCart, updateCart }

