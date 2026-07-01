const express = require('express');
const router = express.Router();
const createHttpError = require('http-errors');
const validate = require('../middlewares/validate.js');
const paymentValidator = require('../utils/paymentValidator.js');
const jwtAuthentication = require('../middlewares/jwtAuthentication.js');

// creating API for initiating payment 
// router.post('/initiate', jwtAuthentication ,  validate(paymentValidator.initiatePaymentValidation)  ,async function _initiatePayment(req, res, next) {
//     try {
//         const data = await require('../controllers/payments/initiatePayment.js')(req.body, req.user);
//         return res.status(201).json({
//             data: data,
//             status: 201,
//             message: 'Request executed successfully, payment initiated',
//             statusText: 'created'
//         });
//     } catch (error) {
//         next(createHttpError(error));
//     }
// });
// module.exports = router;


// process payment 

router.post('/:paymentId/process', jwtAuthentication ,  validate(paymentValidator.processPaymentValidation)  ,async function _processPayment(req, res, next) {
    try {
        const data = await require('../controllers/payments/processPayment.js')(req.params, req.body);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, payment processed',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
});




// getting payment by order id (rename this functionality properly)
router.get('/:orderId', jwtAuthentication  , validate(paymentValidator.particularPaymentValidation), async function _particularPayment (req, res, next) {
    try {
        const data = await require('../controllers/payments/particularPayment.js')(req.params);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, payment details of this order fetched ',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
});

module.exports = router;

// left to think things
// handling of cases where payment fails and retry/refund things
// payment and order connection and handling 
