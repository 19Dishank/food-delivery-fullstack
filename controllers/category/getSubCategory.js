const createHttpError = require('http-errors');
const Category = require('../../models/Category.js');

async function getSubCategory(params){

     const category = await Category.findById(params.id);
    if(!category){
        throw new createHttpError(404, "Category not found ");
    }
    if(category.parentId !== null){
        throw new createHttpError(404, "sub categories not found");
    }
    // const subCategories = await Category.find({parentId: params.id}).explain();
    const subCategories = await Category.find({parentId: params.id});
    console.log('subCategories :>> ', subCategories);
    return subCategories ;

}

module.exports = getSubCategory;