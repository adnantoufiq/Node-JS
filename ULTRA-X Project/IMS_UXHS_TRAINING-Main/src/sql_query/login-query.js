const loginQuery = `
SELECT
    *
FROM
    TBL_USERS
WHERE
    USER_NAME = ?
`;

module.exports = {
    loginQuery,

};
