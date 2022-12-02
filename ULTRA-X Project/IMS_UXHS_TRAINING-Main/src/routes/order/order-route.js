const {
  insertOrderQuery,
  deleteOrderQuery,
  generateOrderUpdateQuery,
  getOrderRow,
  getOrder,
  getOrderIdInformation,
  getOrderGivenIdInformation
} = require("../../sql_query/order-query");
const { pool } = require("../../libs/db/pool");
const { createPagination } = require("../../controller/pagination");
const { parseOrderBodyData } = require("../../middlewares/orderMiddleware/order-middleware");
const { jwtAuthenticate } = require("../../middlewares/auth-token/authenticate-token");
const { getOrderBodyData } = require("../../middlewares/orderMiddleware/update-order-middleware");
//  require module
const express = require("express");

const orderRoute = express.Router();


//  order Add API 
orderRoute.post("/add", jwtAuthenticate, parseOrderBodyData, async (req, res) => {
  const orderInformation = req.body.order;

  const sql = insertOrderQuery;

  const values = [
    orderInformation.CUSTOMER_ID,
    orderInformation.ORDER_AMOUNT,
    orderInformation.ORDER_CURRENT_STATUS,
  ];


  try {
    const [result] = await pool.query(sql, values);
    console.log(result);

    if (result.affectedRows === 1) {
      return res.status(200).send({
        status: "success",
        message: "Order-insert-successfully",
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


// order delete API
orderRoute.delete("/delete/:id", jwtAuthenticate, async (req, res) => {
  const query = deleteOrderQuery;

  const values = [req.params.id];
  // console.log(values)

  try {
    const [result] = await pool.query(query, values);
    console.log(result);

    if (result.affectedRows === 1) {
      return res.status(200).send({
        status: "success",
        message: "ORDER_ID-deleted-successfully",
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

orderRoute.put("/update/:id", jwtAuthenticate, getOrderBodyData, async (req, res) => {
  const orderData = req.body.orderData;

  const [orderUpdateQuery, orderUpdateValue] =
    generateOrderUpdateQuery(orderData);

  try {
    if (orderUpdateValue.length < 2) {
      return res.status(304).send({
        status: "failed",
        message: "you-have-to-pass-at-least-one-value",
      });
    } else {
      const [result] = await pool.query(
        orderUpdateQuery,
        orderUpdateValue
      );
      // console.log(orderUpdateValue);

      if (result.affectedRows === 1) {
        return res.status(200).send({
          status: "success",
          message: "order-update-successfully",
        });
      } else {
        return res.status(506).send({
          status: "failed",
          message: "failed-to-update-data",
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

orderRoute.get("/get-order", jwtAuthenticate, createPagination, async (req, res) => {
  const paginationData = req.body.paginationData;
  try {
    const [rows] = await pool.query(getOrderRow);
    const [result] = await pool.query(getOrder, [paginationData.itemsPerPage, paginationData.offset]);
    let totalRows = 0;
    if (rows.length <= 0) {
      return res.status(506).send({
        status: "failed",
        message: "order-data-not-found"
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


//get orderID information with orderCustomerName given id
orderRoute.get("/order-id-info/:id", jwtAuthenticate, createPagination, async (req, res) => {
  const paginationData = req.body.paginationData;

  try {
    const [rows] = await pool.query(getOrderRow);

    const query = getOrderGivenIdInformation
    const values = [req.params.id];

    const [result] = await pool.query(query, [values, paginationData.itemsPerPage, paginationData.offset]);
    console.log(result)
    let totalRows = 0;
    totalRows = rows[0].TOTAL_ROWS
    return res.status(200).send({
      metadata: {
        pageNo: paginationData.currentPageNumber + 1,
        printItemNo: paginationData.itemsPerPage,
        totalRows: totalRows
      },
      Data: { result },
      status: "success",
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }

})


// get all information with orderIDCustomerName

orderRoute.get("/order-id-info", jwtAuthenticate, createPagination, async (req, res) => {
  const paginationData = req.body.paginationData;
  try {
    const query = getOrderIdInformation
    const [rows] = await pool.query(getOrderRow);


    const [result] = await pool.query(query, [paginationData.itemsPerPage, paginationData.offset]);
    // console.log(result)
    let totalRows = 0;
    totalRows = rows[0].TOTAL_ROWS
    return res.status(200).send({
      metadata: {
        pageNo: paginationData.currentPageNumber + 1,
        printItemNo: paginationData.itemsPerPage,
        totalRows: totalRows
      },
      Data: { result },
      status: "success",
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }

})

module.exports = {
  orderRoute,
};
