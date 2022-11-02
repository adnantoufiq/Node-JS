
//  import module 

const {
  insertOrderItemQuery,
  deleteOrderItemQuery,
  generateOrderitemUpdateQuery,
  getOrderitemRow,
  getOrderitem,
  
  getOrderQuantityWithProductName,
  getQuantityGivenIdInformation } = require("../../sql_query/orderitem-query");
const { pool } = require("../../libs/db/pool");
const { parseOrderItemBodyData } = require("../../middlewares/orderItemMiddleware/orderItem-middleware");
const { createPagination } = require("../../controller/pagination");
const { jwtAuthenticate } = require("../../middlewares/auth-token/authenticate-token");
const { getOrderitemBodyData } = require("../../middlewares/orderItemMiddleware/update-orderitem-middleware");


const express = require("express");
const orderItemRoute = express.Router();


orderItemRoute.post("/add", jwtAuthenticate, parseOrderItemBodyData, async (req, res) => {
  const orderItemInfo = req.body.orderItem;

  const sql = insertOrderItemQuery;

  const values = [
    orderItemInfo.ORDER_ID,
    orderItemInfo.PRODUCT_ID,
    orderItemInfo.ORDER_UNIT_PRICE,
    orderItemInfo.ORDER_QUANTITY,
  ];


  try {
    const [result] = await pool.query(sql, values);


    if (result.affectedRows === 1) {
      return res.status(200).send({
        status: "success",
        message: "OrderItem-insert-successfully",
      });
    } else {
      return res.status(506).send({
        status: "failed",
        message: "Insert Proper Query",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "foreign-key-Constant",
    });
  }
});


orderItemRoute.delete("/delete/:id", jwtAuthenticate, async (req, res) => {
  const query = deleteOrderItemQuery;

  const values = [req.params.id];
  // console.log(values)

  try {
    const [result] = await pool.query(query, values);
    console.log(result);

    if (result.affectedRows === 1) {
      return res.status(200).send({
        status: "success",
        message: "ORDER_ITEM_ID-deleted-successfully",
      });
    } else {
      return res.status(506).send({
        status: "failed",
        message: "Invalid Id",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }
});


orderItemRoute.put("/update/:id", jwtAuthenticate, getOrderitemBodyData, async (req, res) => {
  const orderitemData = req.body.orderitemData;
  const [orderitemUpdateQuery, orderitemUpdateValue] =
    generateOrderitemUpdateQuery(orderitemData);

  try {
    if (orderitemUpdateValue.length < 2) {
      return res.status(304).send({
        status: "failed",
        message: "you-have-to-pass-at-least-one-value",
      });
    } else {
      const [result] = await pool.query(
        orderitemUpdateQuery,
        orderitemUpdateValue
      );
      console.log(orderitemUpdateValue);

      if (result.affectedRows === 1) {
        return res.status(200).send({
          status: "success",
          message: "orderitem-update-successfully",
        });
      } else {
        return res.status(506).send({
          status: "failed",
          message: "failed-to-update-data",
          msg: "test"

        });
      }
    }
  } catch (error) {
    // console.log({ error, customerUpdateValue });
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }
});


orderItemRoute.get("/getOrdetem",  jwtAuthenticate, createPagination,async (req, res) => {


  try {
    const [rows] = await pool.query(getOrderitemRow);
    const [result] = await pool.query(getOrderitem, [paginationData.itemsPerPage, paginationData.offset]);
    let totalRows = 0;
    if (rows.length <= 0) {
      return res.status(506).send({
        status: "failed",
        message: "order-item-data-not-found"
      });
    }
    else {
      totalRows = rows[0].TOTAL_ROWS
      return res.status(200).send({
        metadata: {
          pageNo: paginationData.currentPageNumber + 1,
          printItemNo: paginationData.itemsPerPage,
          totalRows: totalRows
        },
        data: { result },
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }
});


/// get product name, productPrice, product Id with this product order Quantity

orderItemRoute.get("/orderItem-name-Quantity-information", jwtAuthenticate, createPagination, async (req, res) => {
  const paginationData = req.body.paginationData;

  try{
    const [rows] = await pool.query(getOrderitemRow);

    

    let totalRows = 0;
    totalRows = rows[0].TOTAL_ROWS
   const query = getOrderQuantityWithProductName
  //  const values = [req.params.id];
  //  console.log(values)
   
   const [result] = await pool.query(query,[paginationData.itemsPerPage, paginationData.offset]);
   // console.log(result)

   return res.status(200).send({
    metadata: {
      pageNo: paginationData.currentPageNumber + 1,
      printItemNo: paginationData.itemsPerPage,
      totalRows: totalRows
    },
       Data: { result },
       status: "success",
   })

  }catch (error) {
   console.log(error);
   return res.status(500).send({
     status: "failed",
     message: "internal-server-error",
   });
 }

})

//// give by product ID


module.exports = {
  orderItemRoute,
};
