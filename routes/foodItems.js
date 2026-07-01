var express = require('express');
var router = express.Router();
const createHttpError = require('http-errors');
const validate = require('../middlewares/validate.js');
const jwtAuthentication = require('../middlewares/jwtAuthentication.js');
const adminAuthorization = require('../middlewares/adminAuthorization.js');
const foodItemsValidator = require('../utils/foodItemsValidator.js');
const upload = require('../middlewares/multerImageMiddleware.js');

// const upload = multer({dest: "images/"})


// adding food items in the menu  (using uplaod.single in case where single image upload is there)
router.post('/add', jwtAuthentication, adminAuthorization, upload.array('foodImages', 5), validate(foodItemsValidator.addFoodValidation), async function _addFoodItems(req, res, next) {
    try {
        // console.log(req.file, req.body);
        const data = await require('../controllers/foodItems/addFoodItems.js')(req.body, req.files);
        return res.status(201).json({
            data: data,
            status: 201,
            message: 'Request executed successfully , Food Item added ',
            statusText: 'created'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})


// Updating a food item 
router.patch('/:id', jwtAuthentication, adminAuthorization, upload.array('foodImages', 5), validate(foodItemsValidator.updateFoodValidation), async function _updateFoodItem(req, res, next) {
    try {
        const data = await require('../controllers/foodItems/updateFoodItem.js')(req.params, req.body, req.files);
        return res.status(200).json({
            data,
            status: 200,
            message: 'Request executed successfully, food item updated',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})



// deleting food item in the menu 
router.delete('/:id', jwtAuthentication, adminAuthorization, async function _deleteSingleFoodItem(req, res, next) {
    try {
        console.log(req.params);
        const data = await require('../controllers/foodItems/deleteSingleFoodItem.js')(req.params);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, single food item deleted sucessfully',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})


// getting all the food items by category id 
router.get('/category/:id', async function _listFoodByCategory(req, res, next) {
    try {
        console.log(req.params);
        const data = await require('../controllers/foodItems/listFoodByCategory.js')(req.params);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, food item of this category fetched ',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})


// today's special food items (left to make and edit) 
router.get('/today-special', async function _todaySpecial(req, res, next) {
    try {
        const data = await require('../controllers/foodItems/todaySpecial.js')();
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, today\'s special food Items fetched',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})

// get food item by id (when user wants detail of single food item)
router.get('/:id', async function _getSingleFoodItem(req, res, next) {
    try {
        console.log(req.params);
        const data = await require('../controllers/foodItems/getSingleFoodItem.js')(req.params);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, single food item details fetched ',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})

// search any food 
router.get('/search', jwtAuthentication , foodItemsValidator.searchFoodValidation ,async function _searchFood(req, res, next) {
    try {
        const data = await require('../controllers/foodItems/searchFood.js')(req.body ,req.query);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully,food item founded',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})
module.exports = router;