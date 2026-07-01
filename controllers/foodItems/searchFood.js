const createHttpError = require('http-errors');
const FoodItem = require('../../models/FoodItem.js');


async function searchFood(query) {
        console.log("query params", query)
        
        console.log("itemsss",items  );
        return items;

}

module.exports = searchFood;