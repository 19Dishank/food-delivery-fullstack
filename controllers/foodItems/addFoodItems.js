const createHttpError = require('http-errors');
const FoodItem = require('../../models/FoodItem.js');

async function addFoodItems(body, imgFiles) {
    console.log("imgfiles", imgFiles);
    // if (!imgFiles || imgFiles.length == 0) {
    //     throw new createHttpError(422, 'atleast one food image is required');
    // } added to validation chain  
    const existingFoodItem = await FoodItem.findOne({ name: body.name, categoryId: body.categoryId });
    console.log({ existingFoodItem });
    if (existingFoodItem) {
        throw new createHttpError(400, 'food item already exists ');
    }
    //console.log(imgFile.path , `/images/foodImages/${imgFile.filename}`);
    const images = imgFiles.map((imgfile) => `/images/foodImages/${imgfile.filename}`);
    console.log('images :>> ', images);
    body.images = images;
    // body.images = `/images/foodImages/${imgFile.filename}`; for single file 
    console.log({ body });
    const foodItem = await FoodItem.create(body);
    // console.log(foodItem);
    return foodItem;
}
module.exports = addFoodItems;

