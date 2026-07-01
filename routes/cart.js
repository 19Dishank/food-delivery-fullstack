var express = require('express');
var router = express.Router();
const createHttpError = require('http-errors');
const validate = require('../middlewares/validate.js');
const jwtAuthentication = require('../middlewares/jwtAuthentication.js');
const cartValidator = require('../utils/cartValidator.js')


// add foodItems to cart 
router.post('/add', jwtAuthentication, validate(cartValidator.addToCart), async function _addToCart(req, res, next) {
    try {
        const data = await require('../controllers/cart/addToCart.js')(req.body, req.user);
        console.log(data);
        return res.status(201).json({
            data: data,
            status: 201,
            message: 'Request executed successfully,  food items added to cart',
            statusText: 'created'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})

// Get cart details
router.get('/', jwtAuthentication, async function _getCartDetails(req, res, next) {
    try {
        const data = await require('../controllers/cart/getCartDetails.js')(req.user);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, Cart details fetched',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})



router.patch('/:id', jwtAuthentication, validate(cartValidator.updateCart), async function _updateCart(req, res, next) {
    try {
        const data = await require('../controllers/cart/updateCart.js')(req.params, req.body);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, Cart quantity updated',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})


// removing an item from cart (by cart item id)
router.delete('/:id', jwtAuthentication, async function _removeCartItem(req, res, next) {
    try {

        const data = await require('../controllers/cart/removeCartItem.js')(req.params);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, Cart item deleted ',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})

// empty cart
router.delete('/', jwtAuthentication, async function _emptyCart(req, res, next) {
    try {
        const data = await require('../controllers/cart/emptyCart.js')(req.user);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, Cart emptied',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})


module.exports = router;