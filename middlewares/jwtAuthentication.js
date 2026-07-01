const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

function jwtAuthentication(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!(authorizationHeader && authorizationHeader.startsWith("Bearer"))) {
      throw new createHttpError(404, "Authentication failed, No accesss token found in header  ");
    }
    const token = authorizationHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) { throw new createHttpError(401, "Unauthenticated user as access token not verified"); }
    req.user = payload;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') return next(new createHttpError(401, "access token has expired"));
    if (error.name === 'JsonWebTokenError') return next(new createHttpError(401, "invalid token"));
    next(error);
  }

}
module.exports = jwtAuthentication;

