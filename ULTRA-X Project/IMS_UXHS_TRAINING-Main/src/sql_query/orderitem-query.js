const insertOrderItemQuery = `INSERT INTO TBL_ORDER_ITEM
(
        ORDER_ID,	
        PRODUCT_ID, 
        ORDER_UNIT_PRICE, 
        ORDER_QUANTITY
) 
VALUES(?,?,?,?)`;

const deleteOrderItemQuery = `DELETE FROM TBL_ORDER_ITEM WHERE ORDER_ITEM_ID = ?`;


//Product info update query

const generateOrderitemUpdateQuery = (columns) => {

  let _query = 'UPDATE TBL_ORDER_ITEM SET ';
  const _values = [];

  if (columns.ORDER_UNIT_PRICE) {
    _query += 'ORDER_UNIT_PRICE = ? ';
    _values.push(columns.ORDER_UNIT_PRICE);
  }
  if (columns.ORDER_QUANTITY) {
    if (_values.length > 0) {
      _query += ', ';
    }
    _query += 'ORDER_QUANTITY = ? ';
    _values.push(columns.ORDER_QUANTITY);
  }

  if (_values.length > 0) {
    _query += ', ORDER_ITEM_UPDATED_AT = ? ';
    _values.push(columns.ORDER_ITEM_UPDATED_AT);
  }

  _query += 'WHERE ORDER_ITEM_ID =?';
  _values.push(columns.ORDER_ITEM_ID);

  return [_query, _values];
}


const getOrderitemRow = `
SELECT 
  COUNT(*) AS TOTAL_ROWS 
FROM 
  TBL_ORDER_ITEM
`;

const getOrderitem = `
SELECT 
  ORDER_UNIT_PRICE,
  ORDER_QUANTITY 
FROM 
  TBL_ORDER_ITEM LIMIT ? OFFSET ?
`;


const getOrderQuantityWithProductName = `SELECT
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
JOIN tbl_customer ON tbl_customer.CUSTOMER_ID = tbl_order.CUSTOMER_ID LIMIT ? OFFSET ? ;`



module.exports = {
  insertOrderItemQuery,
  deleteOrderItemQuery,
  generateOrderitemUpdateQuery,
  getOrderitemRow,
  getOrderitem,
  getOrderQuantityWithProductName,
};
