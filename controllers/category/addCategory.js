const createHttpError = require('http-errors');
const Category = require('../../models/Category.js');

async function addCategory(body) {

        //  console.log(body);
        const existingCategory = await Category.findOne({
            name: body.name,
            parentId: body.parentId || null
        });
        if (existingCategory) {
            throw new createHttpError(400, "Category is already existing ");
        }
        console.log(existingCategory);
        if (body.parentId) {
            const parentCategory = await Category.findById(body.parentId);
            if (!parentCategory) {
                throw new createHttpError(404, "The provided Parent category not found ");
            }
        }
        const category = await Category.create(body);   
        return category;

}

module.exports = addCategory;