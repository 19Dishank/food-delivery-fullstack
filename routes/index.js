const express = require('express');
const router = express.Router();
const authenticationRoutes = require('./authentication.js');
const usersRoutes = require('./users.js');
const categoriesRoutes = require('./categories.js');
const foodItemsRoutes = require('./foodItems.js');
const cartRoutes = require('./cart.js');
const orderRoutes = require('./orders.js');
const addressRoutes = require('./address.js');
const reviewRoutes = require('./review.js');
const paymentRoutes = require('./payment.js')
// const viewsRoutes = require('./view.js');

router.use('/authentication', authenticationRoutes);
router.use('/users', usersRoutes);
router.use('/categories', categoriesRoutes);
router.use('/food-items', foodItemsRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/address', addressRoutes);
router.use('/reviews', reviewRoutes);
router.use('/payments', paymentRoutes);

// router.use('/views', viewsRoutes);

module.exports = router;