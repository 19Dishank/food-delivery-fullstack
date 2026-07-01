const { body, header } = require('express-validator');

const registerUserValidator = [
    body(["firstName", "lastName"])
        .trim().notEmpty().withMessage("first/last name is required")
        .isLength({ min: 3, max: 50 }).withMessage("first/last name must be at least 3 characters and should not exceed 50 characters")
        .toLowerCase(),
    body("email")
        .trim().notEmpty().withMessage("email is required")
        .isEmail().withMessage("incorrect email").normalizeEmail(),
    body("age")
        .isInt({ min: 10, max: 125 }).withMessage("age must be between 10 and 125")
        .toInt(),
    body("password")
        .trim().notEmpty().withMessage("password is required")
        .isLength({ min: 8 }).withMessage("minimum password length must be 8 ")
        .matches(/\d/).withMessage("password must contain at least one number")
        .matches(/[A-Z]/).withMessage("At least one uppercase character should be there in password"),
    body("phoneNumber")
        .trim().isLength({ max: 10, min: 10 }).withMessage("phone number must be of 10 digits")
];

const loginUserValidator = [
    body("email")
        .exists().withMessage("email is required")
        .trim().notEmpty().withMessage("email cannot be empty")
        .isEmail().withMessage("incorrect email format"),
    body("password")
        .trim().notEmpty().withMessage("password is required")
];


const changePasswordValidator = [
    body("currentPassword")
        .trim().notEmpty().withMessage("old password is required"),
    body("newPassword")
        .trim().notEmpty().withMessage("new password is required")
        .isLength({ min: 8 }).withMessage("minimum password length must be 8 ")
        .matches(/\d/).withMessage("password must contain at least one number")
        .matches(/[A-Z]/).withMessage("At least one uppercase character should be there in password")
        .custom((value, { req }) => {
            return value === req.body.password;
        }),

]

const forgetPasswordValidator = [
    body("email")
        .trim().notEmpty().withMessage("email is required")
        .isEmail().withMessage("incorrect email").normalizeEmail()
]

const resetPasswordValidator = [
    header("Authorization")
        .trim().notEmpty().withMessage("Bearer token is required"),
    body("newPassword")
        .trim().notEmpty().withMessage("new password is required")
        .isLength({ min: 8 }).withMessage("minimum password length must be 8 ")
        .matches(/\d/).withMessage("password must contain at least one number")
        .matches(/[A-Z]/).withMessage("At least one uppercase character should be there in password")
]

module.exports = {
    registerUserValidator,
    loginUserValidator,
    changePasswordValidator,
    forgetPasswordValidator,
    resetPasswordValidator
}