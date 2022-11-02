const insertCustomerQuery = `
INSERT INTO tbl_customer(
    CUSTOMER_FIRST_NAME,
    CUSTOMER_LAST_NAME,
    CUSTOMER_CITY,
    CUSTOMER_COUNTRY,
    CUSTOMER_PHONE_PRIMARY,
    CUSTOMER_PHONE_OPTIONAL
)
VALUES(?, ?, ?, ?, ?, ?)`;

const deleteCustomerQuery = `
DELETE 
FROM 
    customer 
WHERE 
    CUSTOMER_ID = ?`;

//Supplier info update query

const generateCustomerUpdateQuery = (columns) => {
  let _query = "UPDATE TBL_CUSTOMER SET ";
  const _values = [];

  if (columns.CUSTOMER_FIRST_NAME) {
    _query += "CUSTOMER_FIRST_NAME = ? ";
    _values.push(columns.CUSTOMER_FIRST_NAME);
  }
  if (columns.CUSTOMER_LAST_NAME) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "CUSTOMER_LAST_NAME = ? ";
    _values.push(columns.CUSTOMER_LAST_NAME);
  }
  if (columns.CUSTOMER_CITY) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "CUSTOMER_CITY = ? ";
    _values.push(columns.CUSTOMER_CITY);
  }
  if (columns.CUSTOMER_COUNTRY) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "CUSTOMER_COUNTRY = ? ";
    _values.push(columns.CUSTOMER_COUNTRY);
  }
  if (columns.CUSTOMER_PHONE_PRIMARY) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "CUSTOMER_PHONE_PRIMARY = ? ";
    _values.push(columns.CUSTOMER_PHONE_PRIMARY);
  }
  if (columns.CUSTOMER_PHONE_OPTIONAL) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "CUSTOMER_PHONE_OPTIONAL = ? ";
    _values.push(columns.CUSTOMER_PHONE_OPTIONAL);
  }

  if (_values.length > 0) {
    _query += ", CUSTOMER_UPDATED_AT = ? ";
    _values.push(columns.CUSTOMER_UPDATED_AT);
  }

  _query += "WHERE CUSTOMER_ID=?";
  _values.push(columns.CUSTOMER_ID);

  return [_query, _values];
};
const getCustomerRow = `
SELECT
    COUNT(*) AS TOTAL_ROWS
FROM
    TBL_CUSTOMER
`;

const getCustomerOrderProductName = `SELECT
tbl_product.PRODUCT_NAME,
tbl_product.PRODUCT_UNIT_PRICE,
tbl_product.PRODUCT_CREATED_AT
FROM
tbl_product
JOIN tbl_order_item ON tbl_product.PRODUCT_ID = tbl_order_item.PRODUCT_ID
JOIN tbl_order ON tbl_order.ORDER_ID = tbl_order_item.ORDER_ID
JOIN tbl_customer ON tbl_customer.CUSTOMER_ID = tbl_order.CUSTOMER_ID
WHERE
tbl_customer.CUSTOMER_ID = ?`;

const getCustomerOrderInfo = `SELECT
  tbl_product.PRODUCT_ID,
  tbl_product.PRODUCT_NAME,
  tbl_product.PRODUCT_UNIT_PRICE,
  tbl_customer.CUSTOMER_ID,
  tbl_customer.CUSTOMER_FIRST_NAME,
  tbl_order.ORDER_DATE_TIME,
  tbl_order.ORDER_CURRENT_STATUS,
  tbl_order_item.ORDER_QUANTITY
FROM
  tbl_product
JOIN tbl_order_item ON tbl_product.PRODUCT_ID = tbl_order_item.PRODUCT_ID
JOIN tbl_order ON tbl_order.ORDER_ID = tbl_order_item.ORDER_ID
JOIN tbl_customer ON tbl_customer.CUSTOMER_ID = tbl_order.CUSTOMER_ID
LIMIT ? OFFSET ?
;`;

const getCustomer = `SELECT CUSTOMER_FIRST_NAME,CUSTOMER_LAST_NAME,CUSTOMER_CITY,CUSTOMER_COUNTRY,CUSTOMER_PHONE_PRIMARY,CUSTOMER_PHONE_OPTIONAL FROM TBL_CUSTOMER LIMIT ? OFFSET ?`;
module.exports = {
  insertCustomerQuery,
  deleteCustomerQuery,
  getCustomer,
  getCustomerRow,
  generateCustomerUpdateQuery,
  getCustomerOrderProductName,
  getCustomerOrderInfo,
};
