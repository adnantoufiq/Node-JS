const dateFNS = require("date-fns");
/**
 * @description This function is used for email,password validator at the time of update user information
 * 
 */
const getUserBodyData = (req, res, next) => {
    const USER_ID = req.params.id;
    const userData = {
        USER_ID,
        USER_FIRST_NAME: req.body.USER_FIRST_NAME,
        USER_LAST_NAME: req.body.USER_LAST_NAME,
        USER_EMAIL: req.body.USER_EMAIL,
        USER_PHONE_PRIMARY: req.body.USER_PHONE_PRIMARY,
        USER_PHONE_OPTIONAL: req.body.USER_PHONE_OPTIONAL,
        USER_PASSWORD: req.body.USER_PASSWORD,
        ORDER_ITEM_UPDATED_AT: dateFNS.format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };
    const _USER_PASSWORD = userData.USER_PASSWORD + '';
    const PASSWORD_MAX_LENGTH = 15;
    const PASSWORD_MIN_LENGTH = 8;

    const error = [];
    if (userData.USER_EMAIL) {
        if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(userData.USER_EMAIL + '')) {
            error.push("User email is not correct.");
        }
    }

    //check length
    if (userData.USER_PASSWORD) {
        if (_USER_PASSWORD.length > PASSWORD_MAX_LENGTH || _USER_PASSWORD.length < PASSWORD_MIN_LENGTH) {
            error.push("User password length must be more than 8 character and less than 50 character");
        }
    }
    if (error.length > 0) {
        return res.status(406).send({
            status: "failed",
            message: "invalid-data",
            error
        });
    }
    req.body.userData = userData;
    next();
}
module.exports = {
    getUserBodyData
}
