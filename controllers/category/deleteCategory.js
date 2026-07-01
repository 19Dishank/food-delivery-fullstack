const createHttpError = require('http-errors');
const Category = require('../../models/Category.js');

async function deleteCategory(params) {
    const { id } = params;

    const category = await Category.findById(id);
    if (!category) {
        throw new createHttpError(404, "Category not found");
    }

    if (category.parentId === null) {
        const subCategoryCount = await Category.countDocuments({ parentId: id });
        if (subCategoryCount > 0) {
            throw new createHttpError(400, "This category has subcategories, please delete them first");
        }
    }

    await Category.findByIdAndDelete(id);

    return category;
}

module.exports = deleteCategory;