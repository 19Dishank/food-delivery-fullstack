const createHttpError = require('http-errors');
const Review = require('../../models/Review');



async function deleteReview(params) {
   const {reviewId}  = params;
  const review = await Review.findByIdAndDelete(reviewId);
  if(!review){ throw new createHttpError(404, "review not found")}
  return review;
}
module.exports = deleteReview;

