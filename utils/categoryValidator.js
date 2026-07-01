const { body, param } = require("express-validator")

const addCategoryValidation = [
    body("name")
        .trim().notEmpty().withMessage("category name is required")
        .isLength({ min: 3 }).withMessage("category name must be at least 3 characters").toLowerCase(),
    body("description")
        .optional()
        .trim().isLength({ min: 10, }).withMessage("description of category should be provided ")
        .toLowerCase(),
    body("parentId")
        .optional()
        .trim().isMongoId().withMessage("not a valid parent id")
]


const updateCategoryValidation = [
    param("id")
        .trim().notEmpty().withMessage("category id is required to update")
        .isMongoId().withMessage("Category id is not a valid id "),
    body("name")
        .optional()
        .trim().notEmpty().withMessage("category name is required")
        .isLength({ min: 3 }).withMessage("category name must be at least 3 characters").toLowerCase(),
     body("description")
        .optional()
        .trim().isLength({ min: 10, }).withMessage("description of category should be provided ")
        .toLowerCase(),
    body("parentId")
    .optional({nullable: true})
    .isMongoId().withMessage("parent category must be a valid id")
]
const IdParamValidator = [
     param("id")
        .trim().notEmpty().withMessage("Id in parameter is required")
        .isMongoId().withMessage("It is not a valid id ")
]

module.exports = {
    addCategoryValidation,
    updateCategoryValidation,
    IdParamValidator
}
