// import module

const {
  insertSupplierQuery,
  deleteSupplierQuery,
  generateSupplierUpdateQuery,
  getSupplierRow,
  getSupplier } = require("../../sql_query/supplier-query");
const { pool } = require("../../libs/db/pool");
const { createPagination } = require("../../controller/pagination");
const {
  parseSupplierBodyData,
} = require("../../middlewares/supplierMiddleware/supplier-Middleware");
const { jwtAuthenticate } = require("../../middlewares/auth-token/authenticate-token");
const {
  getSupplierBodyData,
} = require("../../middlewares/supplierMiddleware/update-supplier-middleware");


// require middleware 
const express = require("express");

const supplierRoute = express.Router();

//  supplier Add API with fully validation 

supplierRoute.post("/add", jwtAuthenticate, parseSupplierBodyData, async (req, res) => {
  const supplierData = req.body.supplier;

  const query = insertSupplierQuery;

  const values = [
    supplierData.SUPPLIER_COMPANY_NAME,
    supplierData.SUPPLIER_CONTACT_NAME,
    supplierData.SUPPLIER_CITY,
    supplierData.SUPPLIER_COUNTRY,
    supplierData.SUPPLIER_PHONE_PRIMARY,
    supplierData.SUPPLIER_PHONE_OPTIONAL,
    supplierData.SUPPLIER_EMAIL,
  ];

  try {
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 1) {
      return res.status(200).send({
        status: "success",
        message: "Supplier-insert-successfully",
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


// supplier delete API with fully validation 

supplierRoute.delete(
  "/delete/:id",
  jwtAuthenticate,
  async (req, res) => {


    const query = deleteSupplierQuery;

    const values = [req.params.id];
    // console.log(values)

    try {
      const [result] = await pool.query(query, values);
      console.log(result);

      if (result.affectedRows === 1) {
        return res.status(200).send({
          status: "success",
          message: "SUPPLIER_ID-deleted-successfully",
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
  }
);

supplierRoute.put("/update/:id", jwtAuthenticate, getSupplierBodyData, async (req, res) => {
  const supplierData = req.body.supplierData
  const [supplierUpdateQuery, supplierUpdateValue] =
    generateSupplierUpdateQuery(supplierData);

  try {
    if (supplierUpdateValue.length < 2) {
      return res.status(304).send({
        status: "failed",
        message: "you-have-to-pass-at-least-one-value",
      });
    } else {
      const [result] = await pool.query(
        supplierUpdateQuery,
        supplierUpdateValue
      );

      if (result.affectedRows === 1) {
        return res.status(200).send({
          status: "success",
          message: "supplier-update-successfully",
        });
      } else {
        return res.status(506).send({
          status: "failed",
          message: "failed-to-update-data",
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }
});


supplierRoute.get("/get-supplier", jwtAuthenticate, createPagination, async (req, res) => {
  const paginationData = req.body.paginationData;
  try {
    const [rows] = await pool.query(getSupplierRow);
    const [result] = await pool.query(getSupplier, [paginationData.itemsPerPage, paginationData.offset]);
    let totalRows = 0;
    if (rows.length <= 0) {
      return res.status(506).send({
        status: "failed",
        message: "supplier-data-not-found"
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


module.exports = {
  supplierRoute,

};
