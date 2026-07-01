const createError = require('http-errors');
const http = require('http');
const errorHandler404 = (req, res, next) => next(createError(404, "Route not found"));

function errorHandler(err, req, res, next) {
    console.log('err :>> ', err);
    const STATUS = err.status || 500;
    const STATUS_TEXT = http.STATUS_CODES[STATUS];
    return res.status(STATUS).json({
        data: err || {},
        status: STATUS,
        message: err.message || 'Server error',
        statusText: STATUS_TEXT
    })
}
module.exports = { errorHandler404, errorHandler };



