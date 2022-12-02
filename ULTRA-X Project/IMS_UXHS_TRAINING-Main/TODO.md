SELECT
    tbl_product.PRODUCT_NAME
FROM
    tbl_product
JOIN tbl_order_item ON tbl_product.PRODUCT_ID = tbl_order_item.PRODUCT_ID
JOIN tbl_order ON tbl_order.ORDER_ID = tbl_order_item.ORDER_ID
JOIN tbl_customer ON tbl_customer.CUSTOMER_ID = tbl_order.CUSTOMER_ID
WHERE
    tbl_order.ORDER_ID = 7;