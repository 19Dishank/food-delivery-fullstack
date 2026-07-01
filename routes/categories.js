var express = require('express');
var router = express.Router();
const createHttpError = require('http-errors');
const validate = require('../middlewares/validate.js');
const jwtAuthentication = require('../middlewares/jwtAuthentication.js');
const adminAuthorization = require('../middlewares/adminAuthorization.js');
const categoryValidator  = require('../utils/categoryValidator.js');


// add categories 
router.post('/add', jwtAuthentication, adminAuthorization, validate(categoryValidator.addCategoryValidation), async function _addCategory(req, res, next) {
    try {
        // console.log(req.body)
        const data = await require('../controllers/category/addCategory.js')(req.body);
        console.log(data);
        return res.status(201).json({
            data:data,
            status: 201,
            message: 'Request executed successfully, Category created',
            statusText: 'created'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})

// get all the parent categories
router.get('/list-parent', async function _listParentCategory(req, res, next) {
    try {
        const data = await require('../controllers/category/listParentCategory.js')();
        return res.status(200).json({
            data,
            status: 200,
            message: 'Request executed successfully , parent Categories fetched',
            statusText: 'OK'
        });

    } catch (error) {
        next(createHttpError(error));
    }
})


// get all categories  with sub categories
router.get('/show-all', async function _showAllCategoryWithSubCategory(req, res, next) {
    try {
        const data = await require('../controllers/category/showAllCategoryWithSubCategory.js')();
        return res.status(200).json({
            data,
            status: 200,
            message: 'Request executed successfully , All category fetched',
            statusText: 'OK'
        });

    } catch (error) {
        next(createHttpError(error));
    }
})

// get subcategories of a specific category
router.get('/:id/sub-categories', validate(categoryValidator.IdParamValidator) , async function _getSubCategory(req, res, next) {
    try {
        const data = await require('../controllers/category/getSubCategory.js')(req.params);
        console.log(data);
        return res.status(200).json({
            data,
            status: 200,
            message: 'Request executed successfully , sub-categories fetched',
            statusText: 'OK'
        });

    } catch (error) {
        next(createHttpError(error));
    }
})


// getting  a single category by id (used when owner wants to get the detail of a category before updating)
router.get('/:id', async function _getSingleCategory(req,res,next){
     try {
        console.log(req.params);
        const data = await require('../controllers/category/getSingleCategory.js')(req.params);
        return res.status(200).json({
            data:data ,
            status: 200,
            message: 'Request executed successfully, single category details fetched ',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})

// updating a category by id 
router.patch('/:id', jwtAuthentication, adminAuthorization, validate(categoryValidator.updateCategoryValidation), async function _updateCategory(req, res, next) {
    try {
        console.log(req.body, req.params);
        const data = await require('../controllers/category/updateCategory.js')(req.body, req.params);
        return res.status(200).json({
            data:data,
            status: 200,
            message: 'Request executed successfully, Category updated' ,
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }

})

// delete category by id
router.delete('/:id', jwtAuthentication, adminAuthorization, validate(categoryValidator.IdParamValidator), async function _deleteCategory(req, res, next) {
    try {
        const data = await require('../controllers/category/deleteCategory.js')(req.params);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, Category deleted',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
})

module.exports = router;