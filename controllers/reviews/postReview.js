const createHttpError = require('http-errors');
const Review = require('../../models/Review');
const Order = require('../../models/Order');
const orderConstant = require('../../constants/order.constants');
const OrderItem = require('../../models/OrderItem');

async function postReview(body, user) {
    const { foodItemId, orderId, rating, reviewText } = body;
    const userId = user._id;
    const order = await Order.findById(orderId);
    if (!order) { throw new createHttpError(404, "Order not found , so user cannot give review if not ordered") }

    if (order.status !== orderConstant.DELIVERED) { throw new createHttpError(400, "review allowed only after order status is delivered ") }

    const existingItem = await OrderItem.findOne({ orderId, foodItemId });
    if (!existingItem) { throw new createHttpError(400, "food item not found in this order") }

    const existingReview = await Review.findOne({ userId, foodItemId, orderId });
    if (existingReview) { throw new createHttpError(400, " Review already exists ") }

    const review = await Review.create({
        userId,
        foodItemId,
        orderId,
        rating,
        reviewText
    })
    // console.log('review :>> ', review);
    return review;
}

module.exports = postReview ;

