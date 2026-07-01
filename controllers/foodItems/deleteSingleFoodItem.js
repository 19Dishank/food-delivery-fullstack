const createHttpError = require('http-errors');
const FoodItem = require('../../models/FoodItem.js');

async function deleteSingleFoodItem(params) {
    
        const food = await FoodItem.findByIdAndDelete(params.id);
        if (!food) {
            throw new createHttpError(404, "food item not found ");
        }
        return food;
 
}

module.exports = deleteSingleFoodItem;