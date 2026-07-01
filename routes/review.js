const express = require('express');
const router = express.Router();
const createHttpError = require('http-errors');
const validate = require('../middlewares/validate.js');
const reviewValidator = require('../utils/reviewValidator.js');
const jwtAuthentication = require('../middlewares/jwtAuthentication.js');

// For posting a review 
router.post('/', jwtAuthentication, validate(reviewValidator.postReviewValidation) ,async function _postReview(req, res, next) {
    try {
        const data = await require('../controllers/reviews/postReview.js')(req.body, req.user);
        return res.status(201).json({
            data: data,
            status: 201,
            message: 'Request executed successfully, review posted !',
            statusText: 'created'
        });
    } catch (error) {
        next(createHttpError(error));
    }
});

// getting all the reviews a user has posted   (some random unprocessable entity error : bec of get request route placement)
router.get('/my-reviews', jwtAuthentication , async function _getMyReviews(req, res, next) {
    try {
        const data = await require('../controllers/reviews/getMyReview.js')(req.user);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, all the reviews posted by user fetched',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
});


// getting all the reviews for a particular food item with no of reviews and avg ratings   (add pagination - left )
router.get('/:foodItemId', validate(reviewValidator.getAllReviewValidation) ,async function _getAllReview(req, res, next) {
    try {
        const data = await require('../controllers/reviews/getAllReview.js')(req.params);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, all the reviews of this food item fetched',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
});


// user wanted to delete the review 
router.delete('/:reviewId', jwtAuthentication , validate(reviewValidator.deleteReviewValidation) , async function _deleteReview(req, res, next) {
    try {
        const data = await require('../controllers/reviews/deleteReview.js')(req.params);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Request executed successfully, review deleted',
            statusText: 'OK'
        });
    } catch (error) {
        next(createHttpError(error));
    }
});

module.exports = router;
