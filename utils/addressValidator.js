const { body } = require('express-validator');

const addAddress = [
    body("addressDetail")
        .trim().notEmpty().withMessage("address detail like flat no , building name required ")
        .toLowerCase(),
    body("street")
        .trim().notEmpty().withMessage("Street details required")
        .toLowerCase(),
    body("landmark")
        .optional()
        .trim().notEmpty().toLowerCase(),
    body("pincode")
        .trim().notEmpty().withMessage("pincode is required"),
    body("city")
        .trim().notEmpty().withMessage("city name required ")
        .toLowerCase(),
    body("label")
        .optional()
        .trim().notEmpty().toLowerCase()
]

const updateAddress = [
    body("addressDetail")
        .optional()
        .trim().notEmpty().withMessage("address detail like flat no , building name required ")
        .toLowerCase(),
    body("street")
        .optional()
        .trim().notEmpty().withMessage("Street details required")
        .toLowerCase(),
    body("landmark")
        .optional()
        .trim().notEmpty().toLowerCase(),
    body("pincode")
        .trim().notEmpty().withMessage("pincode is required"),
    body("city")
        .optional()
        .trim().notEmpty().withMessage("city name required ")
        .toLowerCase(),
    body("label")
        .optional()
        .trim().notEmpty().withMessage("label name required").toLowerCase()
]

module.exports = {
    addAddress,
    updateAddress
}
