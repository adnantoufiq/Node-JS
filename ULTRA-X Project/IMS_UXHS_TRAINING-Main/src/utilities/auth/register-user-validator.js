/**
 * @author <Md. Majedul Islam> 
 * Software Engineer,
 * Ultra-X BD Ltd.
 *
 * @copyright All right reserved Ultra-X Asia Pacific
 * 
 * @description This file is used for user's username, email and password validation.
 * 
 */
const isValidUsername = (USER_NAME) => {
    const _USER_NAME = USER_NAME + '';
    const USERNAME_MAX_LENGTH = 35;
    if (!_USER_NAME) {
        return false;
    }
    // check length
    if (_USER_NAME.length > USERNAME_MAX_LENGTH) {
        return false;
    }
    if (USER_NAME >= 0 || USER_NAME <= 9) {
        return false;
    }
    return true;
}
const isValidEmail = (USER_EMAIL) => {
    if (!USER_EMAIL) {
        return false;
    }

    if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(USER_EMAIL + '')) {
        return false;
    }
    return true;
}
const isValidPassword = (USER_PASSWORD) => {
    const _USER_PASSWORD = USER_PASSWORD + '';
    const PASSWORD_MAX_LENGTH = 15;
    const PASSWORD_MIN_LENGTH = 8;
    if (!USER_PASSWORD) {
        return false;
    }
    //check length
    if (_USER_PASSWORD.length > PASSWORD_MAX_LENGTH || _USER_PASSWORD.length < PASSWORD_MIN_LENGTH) {
        return false;
    }
    return true;
}
module.exports = {
    isValidUsername,
    isValidEmail,
    isValidPassword
}