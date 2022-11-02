/** @format */

const checkUserName = `
SELECT
    USER_NAME
FROM
    TBL_USERS
WHERE
    USER_NAME = ?`;


module.exports = {
    checkUserName,
};