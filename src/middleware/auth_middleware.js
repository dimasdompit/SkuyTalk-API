const jwt = require("jsonwebtoken");
const { jwtSecretKey, jwtRefreshKey } = require("../config/global");
const helper = require("../helpers/myResponse");
const config = require("../config/global");

module.exports = {
  verifyJwtToken: (request, response, next) => {
    const token = request.headers.authorization;
    try {
      const decode = jwt.verify(token, jwtSecretKey);
      request.decodeToken = decode;
      next();
    } catch (error) {
      console.log(error);
      if (error.name === "Token Expired!") {
        return helper.response(response, "fail", "Token Expired!", 401);
      }
      return helper.response(response, "fail", "Invalid Token!", 401);
    }
  },

  verifyJwtRefreshToken: (request, response, next) => {
    let refreshToken =
      request.body.refreshToken ||
      request.query.refreshToken ||
      request.headers["refresh-token"];

    try {
      if (refreshToken) {
        const decode = jwt.verify(refreshToken, jwtRefreshKey, {
          expiresIn: config.refreshToken,
        });
        request.decodeRefreshToken = decode;
        delete decode.iat;
        next();
      }
    } catch (error) {
      console.log(error);
      if (error.message === "invalid signature") {
        return helper.response(response, "fail", "Invalid Signature", 401);
      }
      return helper.response(response, "fail", "Invalid Token!", 401);
    }
  },
};
