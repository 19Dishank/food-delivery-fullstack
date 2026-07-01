const createHttpError = require('http-errors');
const FoodItem = require('../../models/FoodItem');
const fs = require('fs/promises');
const path = require('path');

async function updateFoodItem(params, body, imgFiles) {

    const food = await FoodItem.findById(params.id);

    if (!food) {
        throw new createHttpError(404, 'food item not found');
    }

    // Replace images only when new images are uploaded
    if (imgFiles && imgFiles.length > 0) {

        // Delete old image files
        for (const image of food.images) {

            try {

                const imagePath = path.join(__dirname,'../../public',image.replace(/^\/+/, ''));
                await fs.unlink(imagePath);

            } catch (error) {
                console.error('Failed to delete image:', image, error.message);
            }
        }

        // Save new image paths
        body.images = imgFiles.map(
            file => `/images/foodImages/${file.filename}`
        );
    }

    const updatedFood = await FoodItem.findByIdAndUpdate(
        params.id,
        { $set: body },
        {
            new: true,
            runValidators: true
        }
    );

    return updatedFood;
}

module.exports = updateFoodItem;