const createHttpError = require("http-errors");

function adminAuthorization(req, res, next) {
    if (!req.user ||  req.user.role !== "restaurantOwner") {
        throw new createHttpError(403, "Forbidden , unauthorised access ");
    }
    next();
}

module.exports = adminAuthorization;

