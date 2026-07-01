const createHttpError = require('http-errors');
const Category = require('../../models/Category.js');

async function listParentCategory() {

   const parentCategories = await Category.find({ parentId: null }).lean();
   if(!parentCategories){
    throw new createHttpError(404, "parent categories not found");
   }
   console.log('parentCategories :>> ', parentCategories);
   return parentCategories;

}
module.exports = listParentCategory;





