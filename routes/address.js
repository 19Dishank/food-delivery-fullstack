var express = require('express');
var router = express.Router();
const createHttpError = require('http-errors');
const validate = require('../middlewares/validate.js');
const addressValidator = require('../utils/addressValidator.js');
const jwtAuthentication = require('../middlewares/jwtAuthentication.js');




// add the address  
router.post('/', jwtAuthentication,  validate(addressValidator.addAddress), async function _addAddress(req, res, next) {
    try {
        const data = await require('../controllers/address/addAddress.js')(req.user,req.body);
        return res.status(201).json({
            data: data,
            status: 201,
            message: 'Request executed successfully , address added !',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})



// get all the saved address
router.get('/', jwtAuthentication, async function _getAllAddress(req, res, next) {
    try {
        const data = await require('../controllers/address/getAllAddress.js')(req.user);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully , all the addresses of user fetched',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})

// for updating address 
router.patch('/:id', jwtAuthentication, async function _updateAddress(req, res, next) {
    try {
        const data = await require('../controllers/address/updateAddress.js')(req.params,req.user,req.body);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully , user address updated ',
            statusText: 'OK'
        });
    }
    catch(error) {
        next(createHttpError(error));
    }
})


// for deleting address of the user 
router.delete('/:id', jwtAuthentication , async function _deleteAddress(req,res,next){
    try{
        const data = await require('../controllers/address/deleteAddress.js')(req.params, req.user);
        return res.status(200).json({
            data:data,
            status:200,
            message: 'Request executed successfully , user address deleted ',
            statusText: 'OK'
        });
    }
    catch(error){
        next(createHttpError(error));
    }
})

module.exports = router;

