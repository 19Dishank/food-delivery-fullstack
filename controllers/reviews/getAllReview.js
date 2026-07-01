const createHttpError = require('http-errors');
const Review = require('../../models/Review');
const User = require('../../models/User');
const mongoose = require('mongoose');

async function getAllReview(params) {
   const { foodItemId } = params;
   console.log('foodItemId :>> ', foodItemId);


   const [reviews, stats] = await Promise.all([
      Review.find({ foodItemId }).populate({ path: 'userId', select: 'firstName lastName -_id' }).sort({ createdAt: -1 }),
      Review.aggregate([
         { $match: { foodItemId: new mongoose.Types.ObjectId(foodItemId) } },
         {
            $group: {
               _id: "$foodItemId",
               averageRating: { $avg: "$rating" },
               totalReviews: { $sum: 1 }
            }
         },
         { $unset: "_id" },
      ])
   ]);

   console.log('stats :>> ', stats);
   console.log('review :>> ', reviews);
   return {
      reviews, stats: stats[0] || {
         averageRating: 0,
         totalReviews: 0
      }
   };
}
module.exports = getAllReview;

