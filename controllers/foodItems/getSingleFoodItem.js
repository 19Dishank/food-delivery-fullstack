const createHttpError = require('http-errors');
const FoodItem = require('../../models/FoodItem.js');

async function getSingleFoodItem(params){

    console.log(params.id);
     const food = await FoodItem.findById(params.id);
     console.log(food);
    if(!food){
        throw new createHttpError(404, "food item not found ");
    }   
    return food;

}

module.exports = getSingleFoodItem;