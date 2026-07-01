const createHttpError = require('http-errors');
const FoodItem = require('../../models/FoodItem.js');
const { create } = require('../../models/Cart.js');

// left , need to change 

async function todaySpecial() {

        const items = await FoodItem.find({ isTodaySpecial: true })
        console.log("itemsss",items  );
        return items;

}

module.exports = todaySpecial;