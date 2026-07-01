const express = require('express');
const  router = express.Router();
const createHttpError = require('http-errors');
const validate = require('../middlewares/validate.js');
const userValidator = require('../utils/userValidator.js');
const jwtAuthentication = require('../middlewares/jwtAuthentication.js');



// update user details (basic profile details)
router.patch('/', jwtAuthentication, validate(userValidator.updateUserValidator), async function _updateUser(req, res, next) {
  try {
    const requestBody = req.body;
    const user = req.user;
    const data = await require('../controllers/users/updateUser.js')(requestBody, user);
    console.log({ data });
    return res.json({
      data: data,
      status: 200,
      message: 'Request executed successfully, user details updated',
      statusText: 'OK'
    });
  } catch (error) {
    next(createHttpError(error));
  }
})


// get the user details 
router.get('/profile-me', jwtAuthentication, async function _userProfile(req, res, next) {
  try {
    const data = await require('../controllers/users/getUserDetails.js')(req.user);
    return res.json({
      data: data,
      status: 200,
      message: 'Request executed successfully , user details fetched',
      statusText: 'OK'
    });
  } catch (error) {
    next(createHttpError(error));
  }
})

module.exports = router;

