const createHttpError = require('http-errors');
const Category = require('../../models/Category.js');


async function updateCategory(body, params) {
        console.log(body, params);
        const { id } = params;
        const { name, description, parentId } = body;
        const updates = {};
        if (name) {
            updates.name = name;
        }
        if (description) {
            updates.description = description;
        }
        if (parentId !== undefined) {
            updates.parentId = parentId;
        }
        const updatedCategory = await Category.findByIdAndUpdate(id, updates, { runValidators: true, new: true });
        if (!updatedCategory) {
            throw new createHttpError(404, "Category Not Found");
        }
        return updatedCategory;
}
module.exports = updateCategory;