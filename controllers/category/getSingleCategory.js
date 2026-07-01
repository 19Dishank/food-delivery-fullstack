const createHttpError = require('http-errors');
const Category = require('../../models/Category.js');

async function getSingleCategory(params){

     const category = await Category.findById(params.id);
    if(!category){
        throw new createHttpError(404, "Category not found ");
    }
    return category;

}

module.exports = getSingleCategory;