const createHttpError = require('http-errors');
const Category = require('../../models/Category.js');

async function showAllCategoryWithSubCategory() {

   const parentCategories = await Category.find({ parentId: null }).lean();
   if(!parentCategories){throw new createHttpError(404, "Parent categories not found ")};
   const result = [];
   for (const parent of parentCategories) {
      const subCategories = await Category.find({ parentId: parent._id })
      result.push(
         {
            ...parent,
            subCategories
         }
      )
   }
   console.log(result);
   return result;

}
module.exports = showAllCategoryWithSubCategory;





