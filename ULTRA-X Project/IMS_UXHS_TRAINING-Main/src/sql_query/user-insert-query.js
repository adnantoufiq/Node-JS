/** @format */

const insertUserQuery = `
        INSERT INTO TBL_USERS
        (
            USER_NAME,
            USER_EMAIL,
            USER_PASSWORD
        )
        VALUES (?, ?, ?)
        `;


/**
 * This function is used for user update query
 */
const generateUserUpdateQuery = (columns) => {

	let _query = 'UPDATE TBL_USERS SET ';
	const _values = [];

	if (columns.USER_FIRST_NAME) {
		_query += 'USER_FIRST_NAME = ? ';
		_values.push(columns.USER_FIRST_NAME);
	}
	if (columns.USER_LAST_NAME) {
		if (_values.length > 0) {
			_query += ', ';
		}
		_query += 'USER_LAST_NAME = ? ';
		_values.push(columns.USER_LAST_NAME);
	}
	if (columns.USER_EMAIL) {
		if (_values.length > 0) {
			_query += ', ';
		}
		_query += 'USER_EMAIL = ? ';
		_values.push(columns.USER_EMAIL);
	}
	if (columns.USER_PHONE_PRIMARY) {
		if (_values.length > 0) {
			_query += ', ';
		}
		_query += 'USER_PHONE_PRIMARY = ? ';
		_values.push(columns._password);
	}
	if (columns.USER_PHONE_OPTIONAL) {
		if (_values.length > 0) {
			_query += ', ';
		}
		_query += 'USER_PHONE_OPTIONAL = ? ';
		_values.push(columns.USER_PHONE_OPTIONAL);
	}
	if (columns.USER_PASSWORD) {
		if (_values.length > 0) {
			_query += ', ';
		}
		_query += 'USER_PASSWORD = ? ';
		_values.push(columns._password);
	}

	if (_values.length > 0) {
		_query += ', USER_UPDATED_AT = ? ';
		_values.push(columns.ORDER_ITEM_UPDATED_AT);
	}

	_query += 'WHERE USER_ID  =?';
	_values.push(columns.USER_ID);

	return [_query, _values];
}


const getUserRow = `
SELECT 
	COUNT(*) AS TOTAL_ROWS 
FROM 
	TBL_USERS
`;

const getUser = `
SELECT 
	USER_NAME, 
	USER_FIRST_NAME,
	USER_LAST_NAME,
	USER_EMAIL,
	USER_PHONE_PRIMARY,
	USER_PHONE_OPTIONAL 
FROM 
	TBL_USERS LIMIT ? OFFSET ?
`;


module.exports = {
	insertUserQuery,
	generateUserUpdateQuery,
	getUserRow,
	getUser
};
