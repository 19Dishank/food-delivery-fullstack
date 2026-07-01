const { body, param } = require("express-validator");

const postReviewValidation = [
    body("foodItemId")
        .trim().notEmpty().withMessage("food item id is required")
        .isMongoId().withMessage("Not a valid food item id"),
    body("orderId")
        .trim().notEmpty().withMessage("order id is required")
        .isMongoId().withMessage("Not a valid order id"),
    body("rating")
        .exists({ values: "falsy" }).withMessage("rating feild is required ")
        .isInt({ min: 1, max: 5 }).withMessage("food rating must be an integer between 1 to 5 ")
        .toInt(),
    body("reviewText")
        .optional()
        .trim().notEmpty().withMessage("review text cannot be empty")
        .isLength({ min: 5 }).withMessage("minimum review text must be of 5 characters ")
]

const getAllReviewValidation = [
    param("foodItemId")
        .trim().notEmpty().withMessage("food item id is required in params")
        .isMongoId().withMessage("food item id passed in paramas is not a valid id ")
]


const deleteReviewValidation = [
    param("reviewId")
        .trim().notEmpty().withMessage("review id is required in params")
        .isMongoId().withMessage("review id passed in paramas is not a valid id ")
]

module.exports = {
    postReviewValidation,
    getAllReviewValidation,
    deleteReviewValidation
}
