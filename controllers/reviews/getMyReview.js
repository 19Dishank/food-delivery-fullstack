const createHttpError = require('http-errors');
const Review = require('../../models/Review');
const FoodItem = require('../../models/FoodItem');


async function getMyReview(user) {
   const userId = user._id;
   const reviews = await Review.find({userId}).populate({path: 'foodItemId'}).sort({createdAt: -1})
   console.log('reviews :>> ', reviews);
   return reviews;
}
module.exports = getMyReview;

