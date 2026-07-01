var express = require('express');
var router = express.Router();
const createHttpError = require('http-errors');
const validate = require('../middlewares/validate.js');
const authValidator = require('../utils/authValidator.js');
const jwtAuthentication = require('../middlewares/jwtAuthentication.js');

// user register/signup
router.post('/signup', validate(authValidator.registerUserValidator), async function _register(req, res, next) {
  try {
    const requestBody = req.body;
    const data = await require('../controllers/authentication/register.js')(requestBody);
    return res.status(201).json({
      data: data,
      status: 201,
      message: 'Request executed successfully , user created ',
      statusText: 'Created'
    });
  } catch (error) {
    next(createHttpError(error));
  }
})


// user login 
router.post('/login', validate(authValidator.loginUserValidator), async function _login(req, res, next) {
  try {
    const requestBody = req.body;
    const data = await require('../controllers/authentication/login.js')(requestBody);
    return res.status(200).json({
      data: data,
      status: 200,
      message: 'Request executed successfully, User logged in',
      statusText: 'OK'
    });
  } catch (error) {
    next(createHttpError(error));
  }
})




// change user password 
router.post('/change-password', jwtAuthentication, validate(authValidator.changePasswordValidator), async function _changePassword(req, res, next) {
  try {
    const data = await require('../controllers/authentication/changePassword.js')(req.body, req.user);
    console.log({ data });

    // return res.ok(200, {
    //   updatedAt: data,
    //   status: 200,
    //   message: 'Request executed successfully, password changed',
    //   statusText: 'OK'
    // })

    return res.status(200).json({
      data: data,
      status: 200,
      message: 'Request executed successfully, password changed',
      statusText: 'OK'
    });
  } catch (error) {
    next(createHttpError(error));
  }
})


// forget password
router.post('/forget-password', validate(authValidator.forgetPasswordValidator), async function _forgetPassword(req, res, next) {
  try {
    const data = await require('../controllers/authentication/forgetPassword.js')(req.body);
    return res.status(200).json({
      data: data,
      status: 200,
      message: 'Request executed successfully , reset link sent on mail',
      statusText: 'OK'
    });
  } catch (error) {
    next(createHttpError(error));
  }
})


// reset password
router.post('/reset-password', validate(authValidator.resetPasswordValidator), async function _resetPassword(req, res, next) {
  try {
    const data = await require('../controllers/authentication/resetPassword.js')(req.headers,req.body);
    
    return res.status(200).json({
      data,
      status: 200,
      message: 'Request executed successfully , password updated sucessfully',
      statusText: 'OK'
    });
  } catch (error) {
    next(createHttpError(error));
  }
})

//refresh for getting new access Token
router.post('/refresh', async function _refresh(req, res, next) {
  try {
   
    const data = await require('../controllers/authentication/refresh.js')(req.headers);
    return res.status(200).json({
      data: data,
      status: 200,
      message: 'Request executed successfully, access & refresh token generated',
      statusText: 'OK'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
