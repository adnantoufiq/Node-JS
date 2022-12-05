require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * @author Ariful Islam Toufiq,
 * Software Engineer,
 * Ultra-X BD Ltd.
 *
 * @copyright All right reserved Ultra-X Asia Pacific
 *
 * @description
 *
 */
const jwtAuthenticate = (req, res, next) => {
  const authHeader = (req.headers["authorization"] || req.body.token) + "";
  let token = authHeader.replace("Bearer ", "");
  token = authHeader.replace("Bearer ", "");

  if (token === null) {
    return res.status(401).send({
      status: "failed",
      message: "unauthorized-user",
    });
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (user) {
      next();
    }
  } catch (error) {
    return res.status(200).send({
      status: "failed",
      isValidToken: false,
      message: "toke-is-not-valid",
    });
  }
};
module.exports = {
  jwtAuthenticate,
};
