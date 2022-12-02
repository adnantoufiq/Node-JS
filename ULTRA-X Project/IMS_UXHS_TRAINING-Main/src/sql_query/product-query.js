const insertProductQuery = `INSERT INTO TBL_PRODUCT
(   
    SUPPLIER_ID,
    PRODUCT_NAME,	
    PRODUCT_UNIT_PRICE, 
    PRODUCT_PACKAGE, 
    PRODUCT_IMAGE
 ) 
VALUES(?,?,?,?,?)`;

const deleteProductQuery = `DELETE FROM TBL_PRODUCT WHERE PRODUCT_ID  = ?`;

//Product info update query

const generateProductUpdateQuery = (columns) => {
  let _query = "UPDATE TBL_PRODUCT SET ";
  const _values = [];

  if (columns.PRODUCT_NAME) {
    _query += "PRODUCT_NAME = ? ";
    _values.push(columns.PRODUCT_NAME);
  }
  if (columns.PRODUCT_UNIT_PRICE) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "PRODUCT_UNIT_PRICE = ? ";
    _values.push(columns.PRODUCT_UNIT_PRICE);
  }
  if (columns.PRODUCT_PACKAGE) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "PRODUCT_PACKAGE = ? ";
    _values.push(columns.PRODUCT_PACKAGE);
  }
  if (columns.PRODUCT_IMAGE) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "PRODUCT_IMAGE = ? ";
    _values.push(columns.PRODUCT_IMAGE);
  }
  if (columns.PRODUCT_IS_DISCONTINUED) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "PRODUCT_IS_DISCONTINUED = ? ";
    _values.push(columns.PRODUCT_IS_DISCONTINUED);
  }

  if (_values.length > 0) {
    _query += ", PRODUCT_UPDATED_AT = ? ";
    _values.push(columns.PRODUCT_UPDATED_AT);
  }

  _query += "WHERE PRODUCT_ID =?";
  _values.push(columns.PRODUCT_ID);

  return [_query, _values];
};

const getProductRow = `
SELECT 
    COUNT(*) AS TOTAL_ROWS 
FROM 
    TBL_PRODUCT
    `;

const getProduct = `
SELECT 
    PRODUCT_NAME, 
    PRODUCT_UNIT_PRICE, 
    PRODUCT_PACKAGE, 
    PRODUCT_IMAGE 
FROM 
    TBL_PRODUCT LIMIT ? OFFSET ?
`;

const productCompanyInformation = `SELECT
tbl_supplier.SUPPLIER_COMPANY_NAME,
tbl_supplier.SUPPLIER_EMAIL,
tbl_product.PRODUCT_NAME,
tbl_product.PRODUCT_UNIT_PRICE
FROM
tbl_product
INNER JOIN tbl_supplier ON tbl_supplier.SUPPLIER_ID = tbl_product.PRODUCT_ID

`;

const getQuantityGivenIdInformation = `
SELECT
    tbl_product.PRODUCT_NAME,
    tbl_product.PRODUCT_UNIT_PRICE,
    tbl_customer.CUSTOMER_ID,
    tbl_customer.CUSTOMER_FIRST_NAME,
    tbl_order.ORDER_DATE_TIME,
    tbl_order.ORDER_CURRENT_STATUS,
    tbl_order_item.ORDER_QUANTITY
FROM
    tbl_product
JOIN tbl_order_item 
ON 
    tbl_product.PRODUCT_ID = tbl_order_item.PRODUCT_ID
JOIN tbl_order 
ON 
   tbl_order.ORDER_ID = tbl_order_item.ORDER_ID
JOIN tbl_customer 
ON 
    tbl_customer.CUSTOMER_ID = tbl_order.CUSTOMER_ID

WHERE tbl_product.PRODUCT_ID = ?;`;

module.exports = {
  insertProductQuery,
  generateProductUpdateQuery,
  deleteProductQuery,
  getProductRow,
  getProduct,
  productCompanyInformation,
  getQuantityGivenIdInformation,
};
