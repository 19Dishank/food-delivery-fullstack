const express = require('express');
const router = express.Router();
const createHttpError = require('http-errors');
const validate = require('../middlewares/validate.js');
const jwtAuthentication = require('../middlewares/jwtAuthentication.js');
const orderValidator = require('../utils/orderValidator.js');
const adminAuthorization = require('../middlewares/adminAuthorization.js');

// place order
router.post('/place', jwtAuthentication, validate(orderValidator.placeOrderValidation), async function _placeOrder(req, res, next) {
    try {
        const data = await require('../controllers/orders/placeOrder.js')(req.body, req.user);
        return res.status(201).json({
            data: data,
            status: 201,
            message: 'Request executed successfully, order placed ! ',
            statusText: 'created'
        });
    } catch (error) {
        next(createHttpError(error));
    }
});


//get all orders of a user (order history)
router.get('/', jwtAuthentication, async function _getAllOrders(req, res, next) {
    try {
        const data = await require('../controllers/orders/getAllOrders.js')(req.user);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, order history of user fetched ! ',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})


// getting order details of a specific order by id
router.get('/:id', jwtAuthentication, async function _getOrderDetails(req, res, next) {
    try {
        const data = await require('../controllers/orders/getOrderDetails.js')(req.params);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, order details fetched successfully ! ',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})

// user cancel order based on order status (left to test and use)
router.patch('/:id/cancel', jwtAuthentication, async function _cancelOrder(req, res, next) {
    try {
        const data = await require('../controllers/orders/cancelOrder.js')(req.params);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, order cancelled ! ',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})

//  updating order status (by admin) 
router.patch('/:id/status', jwtAuthentication, adminAuthorization,  validate(orderValidator.updateOrderStatusValidation), async function _updateOrderStatus(req, res, next) {
    try {
        const data = await require('../controllers/orders/updateOrderStatus.js')(req.params, req.body);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, order status updated !',
            statusText: 'OK'
        });
    }
    catch (error) {
        next(createHttpError(error));
    }
})

module.exports = router;