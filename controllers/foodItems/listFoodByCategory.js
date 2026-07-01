const createHttpError = require('http-errors');
const FoodItem = require('../../models/FoodItem.js');
require('../../models/Category.js');

async function listFoodByCategory(params){

    const categoryId = params.id;
    const foodItems = await FoodItem.find({categoryId: categoryId}).populate({path: 'categoryId' , select: 'name'});
    // console.log(foodItems);
    return foodItems;

}
module.exports = listFoodByCategory;