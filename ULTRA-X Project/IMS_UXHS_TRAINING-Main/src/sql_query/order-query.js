const insertOrderQuery = `INSERT INTO TBL_ORDER
(   
    CUSTOMER_ID,	
    ORDER_AMOUNT, 
    ORDER_CURRENT_STATUS
    
 ) 
VALUES(?,?,?)
`;

const deleteOrderQuery = `
DELETE 
FROM 
    TBL_ORDER 
WHERE 
    ORDER_ID  = ?
`;

//Order info update query

const generateOrderUpdateQuery = (columns) => {
  let _query = "UPDATE TBL_ORDER SET ";
  const _values = [];

  if (columns.ORDER_AMOUNT) {
    _query += "ORDER_AMOUNT = ? ";
    _values.push(columns.ORDER_AMOUNT);
  }
  if (columns.ORDER_CURRENT_STATUS) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "ORDER_CURRENT_STATUS = ? ";
    _values.push(columns.ORDER_CURRENT_STATUS);
  }

  if (_values.length > 0) {
    _query += ", ORDER_UPDATED_AT = ? ";
    _values.push(columns.ORDER_UPDATED_AT);
  }

  _query += "WHERE ORDER_ID =?";
  _values.push(columns.ORDER_ID);

  return [_query, _values];
};

const getOrderRow = `
SELECT
    COUNT(*) AS TOTAL_ROWS
FROM
    TBL_ORDER
`;

const getOrder = `
SELECT
    ORDER_DATE_TIME,
    ORDER_AMOUNT,
    ORDER_CURRENT_STATUS
FROM
    TBL_ORDER LIMIT ? OFFSET ?
`;

const getOrderIdInformation = `
SELECT
tbl_order.ORDER_ID,
tbl_customer.CUSTOMER_FIRST_NAME,
tbl_customer.CUSTOMER_LAST_NAME,
tbl_customer.CUSTOMER_COUNTRY,
tbl_customer.CUSTOMER_CITY

FROM
tbl_customer
JOIN tbl_order ON tbl_customer.CUSTOMER_ID = tbl_order.CUSTOMER_ID
ORDER BY
tbl_order.ORDER_ID LIMIT ? OFFSET ?`;

const getOrderGivenIdInformation = `SELECT
tbl_customer.CUSTOMER_FIRST_NAME,
tbl_customer.CUSTOMER_LAST_NAME,
tbl_customer.CUSTOMER_COUNTRY,
tbl_customer.CUSTOMER_CITY

FROM
tbl_customer
JOIN tbl_order ON tbl_customer.CUSTOMER_ID = tbl_order.CUSTOMER_ID
WHERE 
tbl_order.ORDER_ID = ? LIMIT ? OFFSET ?`;

module.exports = {
  insertOrderQuery,
  deleteOrderQuery,
  generateOrderUpdateQuery,
  getOrderRow,
  getOrder,
  getOrderIdInformation,
  getOrderGivenIdInformation,
};
