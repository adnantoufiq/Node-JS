/**
 * @author Md. Majedul Islam,
 * Software Engineer,
 * Ultra-X BD Ltd.
 *
 * @copyright All right reserved Ultra-X Asia Pacific
 * 
 * @description 
 * 
 */
const {
  isValidUsername,
  isValidEmail,
  isValidPassword,
} = require("../../utilities/auth/register-user-validator");
const { pool } = require("../../libs/db/pool");
const { checkUserName } = require('../../sql_query/check-username')
/**
 * 
 * @description : This middleware is for user validation
 */
const signupUserValidation = async (req, res, next) => {

  const user = {
    USER_NAME: req.body.USER_NAME,
    USER_EMAIL: req.body.USER_EMAIL,
    USER_PASSWORD: req.body.USER_PASSWORD
  }
  const errors = [];
  console.log(user.USER_PASSWORD)

  // Check User Information validity
  if (!isValidUsername(user.USER_NAME))
    errors.push('invalid-username');

  if (!isValidEmail(user.USER_EMAIL))
    errors.push('invalid-email');

  if (!isValidPassword(user.USER_PASSWORD))
    errors.push('invalid-password');

  if (errors.length > 0) {
    return res.status(406).send({
      status: "failed",
      message: "invalid-data",
      errors,
    });
  }

  // Check user if already exists

  try {
    const [result] = await pool.query(checkUserName, [user.USER_NAME]);

    if (result.length > 0) {
      return res.status(406).send({
        status: "failed",
        message: "user-already-exists",
      })
    } else {
      req.body.user = user;
      next();
    }

  } catch (err) {
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    })
  }
};


module.exports = {
  signupUserValidation
}