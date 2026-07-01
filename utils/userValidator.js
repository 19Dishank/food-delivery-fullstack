const { body } = require('express-validator');


const updateUserValidator = [
    body(["firstName", "lastName"])
        .optional()
        .trim().notEmpty().withMessage("first/last name is required")
        .isLength({ min: 3, max: 50 }).withMessage("first/last name must be at least 3 characters and should not exceed 50 characters")
        .toLowerCase(),
    body("phoneNumber")
        .optional()
        .trim().isLength({ max: 10, min: 10 }).withMessage("phone number must be of 10 digits"),
    body("age")
        .optional()
        .isInt({ min: 10, max: 125 }).withMessage("age must be between 10 and 125"),
    body("email")
        .not().exists().withMessage("email used for registration cannot be updated"),
    body("role")
        .not().exists().withMessage("role cannot be updated by user "),
    body("address")
        .not().exists().withMessage("address is updated in seperate endpoint"),
    body("password")
        .not().exists().withMessage("password is updated in seperate endpoint")
];


module.exports = {
    updateUserValidator,
}