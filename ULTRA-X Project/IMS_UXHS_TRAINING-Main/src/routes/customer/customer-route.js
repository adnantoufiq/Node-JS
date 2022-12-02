//  import module
const {
  insertCustomerQuery,
  deleteCustomerQuery,
  generateCustomerUpdateQuery,
  getCustomerRow,
  getCustomer,
  getCustomerOrderProductName,
} = require("../../sql_query/customer-query");
const { createPagination } = require("../../controller/pagination");
const { pool } = require("../../libs/db/pool");
const { jwtAuthenticate } = require("../../middlewares/auth-token/authenticate-token");
const {
  parseCustomerBodyData,
} = require("../../middlewares/customerMiddleware/customer-middleware.js");
const {
  getCustomerBodyData,
} = require("../../middlewares/customerMiddleware/update-customer-middleware");
//  require middleware
const express = require("express");
/**
 * Creates a route to use /customer
 */
const customerRoute = express.Router();

customerRoute.post("/add", jwtAuthenticate, parseCustomerBodyData, async (req, res) => {
  const customerData = req.body.customer;

  const query = insertCustomerQuery;

  const values = [
    customerData.CUSTOMER_FIRST_NAME,
    customerData.CUSTOMER_LAST_NAME,
    customerData.CUSTOMER_CITY,
    customerData.CUSTOMER_COUNTRY,
    customerData.CUSTOMER_PHONE_PRIMARY,
    customerData.CUSTOMER_PHONE_OPTIONAL,
  ];

  try {
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 1) {
      return res.status(200).send({
        status: "success",
        message: "Customer-insert-successfully",
      });
    } else {
      return res.status(506).send({
        status: "failed",
        message: "Invalid ",
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


// customer API delete customer
customerRoute.delete(
  "/delete/:id", jwtAuthenticate,

  async (req, res) => {
    const query = deleteCustomerQuery;

    const values = [req.params.id];
    console.log(values);

    try {
      const [result] = await pool.query(query, values);
      console.log(result);

      if (result.affectedRows === 1) {
        return res.status(200).send({
          status: "success",
          message: "Customer_ID-deleted-successfully",
        });
      } else {
        return res.status(506).send({
          status: "failed",
          message: "Id-not-found",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "failed",
        message: "internal-server-error",
      });
    }
  }
);

customerRoute.put("/update/:id", jwtAuthenticate, getCustomerBodyData, async (req, res) => {
  const customerData = req.body.customerData

  const [customerUpdateQuery, customerUpdateValue] =
    generateCustomerUpdateQuery(customerData);

  try {
    if (customerUpdateValue.length < 2) {
      return res.status(304).send({
        status: "failed",
        message: "you-have-to-pass-at-least-one-value",
      });
    } else {
      const [result] = await pool.query(
        customerUpdateQuery,
        customerUpdateValue
      );
      console.log(result);

      if (result.affectedRows === 1) {
        return res.status(200).send({
          status: "success",
          message: "customer-update-successfully",
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

customerRoute.get("/get-customer", jwtAuthenticate, createPagination, async (req, res) => {
  const paginationData = req.body.paginationData;
  try {
    const [rows] = await pool.query(getCustomerRow);

    const [result] = await pool.query(getCustomer, [paginationData.itemsPerPage, paginationData.offset]);
    let totalRows = 0;
    if (rows.length <= 0) {
      return res.status(506).send({
        status: "failed",
        message: "Customer-data-not-found"
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


//  get customer order product name

customerRoute.get("/customer-order-information/:id", jwtAuthenticate, createPagination, async (req, res) => {

  try{
    const [rows] = await pool.query(getCustomerRow);
   const query = getCustomerOrderProductName
   const values = [req.params.id];
   const paginationData = req.body.paginationData;
   console.log(values)
   
   const [result] = await pool.query(query,  [paginationData.itemsPerPage, paginationData.offset], values);
   // console.log(result)
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

  }catch (error) {
   console.log(error);
   return res.status(500).send({
     status: "failed",
     message: "internal-server-error",
   });
 }

})
 

module.exports = {
  customerRoute,
};
