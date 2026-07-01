const { body, param } = require('express-validator');

const addFoodValidation = [
    body("name")
        .trim().notEmpty().withMessage("Food name is required")
        .isLength({ min: 3 }).withMessage("food name must be at least 3 characters long")
        .toLowerCase(),
    body("price")
        .notEmpty().withMessage("Food price is required")
        .isFloat({ min: 0.01 }).withMessage("price is an integer and cannot be negative "),
    body("categoryId")
        .trim().notEmpty().withMessage("Food item category is required")
        .isMongoId().withMessage("Not a valid category id"),
    body("isVeg")
        .notEmpty().withMessage("Food is vegetarian or not is required to be specified ")
        .isBoolean().withMessage("isVeg must be a boolean value (true or false)")
        .toBoolean(),
    // body("availableTime")
    //     .isArray({ min: 1, max: 3 }).withMessage("Food item availability time is an array of minimum one avalibilty time "),
    body("availableTime")
    .customSanitizer(value => {
        if (Array.isArray(value)) return value;
        return [value];
    })
    .isArray({ min: 1, max: 3 })
    .withMessage("Food item availability time is an array of minimum one availability time"),
    body("availableTime.*")
        .isString().notEmpty().withMessage("Available time  must be of string ")
        .toLowerCase()
        .isIn(["breakfast", "lunch", "dinner"]).withMessage("Available time must be one of breakfast/lunch/dinner"),
    body("isAvailable")
        .notEmpty().withMessage("Food is available or not is required ")
        .isBoolean().withMessage("isAvailable must be a boolean value (true or false)")
        .toBoolean(),
    body("isTodaySpecial")
        .optional()
        .isBoolean().withMessage("isTodaySpecial must be a boolean value (true or false)")
        .toBoolean(),
    body().custom((value, { req }) => {
        if (!req.files || req.files.length === 0) {
            throw new Error('Please upload at least one food image');
        }
        return true;
    })

]

const updateFoodValidation = [
    param("id")
        .isMongoId().withMessage("not a valid food item id"),
    body("name")
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage("food name must be at least 3 characters long")
        .toLowerCase(),
    body("price")
        .optional()
        .isFloat({ min: 0.01 }).withMessage("price is an integer and cannot be negative "),
    body("categoryId")
        .optional().trim()
        .isMongoId().withMessage("Not a valid category id"),
    body("isVeg")
        .optional()
        .isBoolean().withMessage("isVeg must be a boolean value (true or false)")
        .toBoolean(),
    // body("availableTime")
    //     .optional()
    //     .isArray({ min: 1, max: 3 }).withMessage("Food item availability time is an array of minimum one avalibilty time "),
    body("availableTime")
     .optional()
    .customSanitizer(value => {
        if (Array.isArray(value)) return value;
        return [value];
    })
    .isArray({ min: 1, max: 3 })
    .withMessage("Food item availability time is an array of minimum one availability time"),
    body("availableTime.*")
        .optional()
        .isString().notEmpty().withMessage("Available time  must be of string ")
        .toLowerCase()
        .isIn(["breakfast", "lunch", "dinner"]).withMessage("Available time must be one of breakfast/lunch/dinner"),
    body("isAvailable")
        .optional()
        .isBoolean().withMessage("isAvailable must be a boolean value (true or false)")
        .toBoolean(),
    body("isTodaySpecial")
        .optional()
        .isBoolean().withMessage("isTodaySpecial must be a boolean value (true or false)")
        .toBoolean()
]

const searchFoodValidation = []

module.exports = {
    addFoodValidation,
    updateFoodValidation,
    searchFoodValidation
}