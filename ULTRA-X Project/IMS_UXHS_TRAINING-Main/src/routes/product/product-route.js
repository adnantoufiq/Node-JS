// import module

const {
  insertProductQuery,
  deleteProductQuery,
  generateProductUpdateQuery,
  getProductRow,
  getProduct,
  getProductName,
  productCompanyInformation,
  getQuantityGivenIdInformation
} = require("../../sql_query/product-query");
const { pool } = require("../../libs/db/pool");
const { createPagination } = require("../../controller/pagination");
const {
  parseProductBodyData,
} = require("../../middlewares/productMiddleware/product-middleware");
const { jwtAuthenticate } = require("../../middlewares/auth-token/authenticate-token");
const { getProductBodyData } = require("../../middlewares/productMiddleware/update-product-middleware");


//  require middleware
const express = require("express");
const productRoute = express.Router();



//  product route API for add product
productRoute.post("/add", jwtAuthenticate, parseProductBodyData, async (req, res) => {

  const productInformation = req.body.product;

  const sql = insertProductQuery;

  const values = [

    productInformation.SUPPLIER_ID,
    productInformation.PRODUCT_NAME,
    productInformation.PRODUCT_UNIT_PRICE,
    productInformation.PRODUCT_PACKAGE,
    productInformation.PRODUCT_IMAGE,
  ];

  try {
    const [result] = await pool.query(sql, values);

    if (result.affectedRows === 1) {
      return res.status(200).send({
        status: "success",
        message: "Product-insert-successfully",
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
      message: "Foreign-Key-Constant",

    });
  }
});


//  product route API for delete product
productRoute.delete(
  "/delete/:id", jwtAuthenticate,
  async (req, res) => {


    const query = deleteProductQuery;

    const values = [req.params.id];
    // console.log(values)

    try {
      const [result] = await pool.query(query, values);
      console.log(result);

      if (result.affectedRows === 1) {
        return res.status(200).send({
          status: "success",
          message: "PRODUCT_ID-deleted-successfully",
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


productRoute.put("/update/:id", jwtAuthenticate, getProductBodyData, async (req, res) => {
  const productData = req.body.productData;

  const [productUpdateQuery, productUpdateValue] =
    generateProductUpdateQuery(productData);
  console.log(productUpdateQuery);
  try {
    if (productUpdateValue.length < 2) {
      return res.status(304).send({
        status: "failed",
        message: "you-have-to-pass-at-least-one-value",
      });
    } else {
      const [result] = await pool.query(
        productUpdateQuery,
        productUpdateValue
      );
      console.log(result);

      if (result.affectedRows === 1) {
        return res.status(200).send({
          status: "success",
          message: "product-update-successfully",
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


productRoute.get("/get-product", jwtAuthenticate, createPagination, async (req, res) => {
  const paginationData = req.body.paginationData;
  try {
    const [rows] = await pool.query(getProductRow);
    const [result] = await pool.query(getProduct, [paginationData.itemsPerPage, paginationData.offset]);
    let totalRows = 0;
    if (rows.length <= 0) {
      return res.status(506).send({
        status: "failed",
        message: "product-data-not-found"
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







//  productCompany information route


productRoute.get("/product-all-information", jwtAuthenticate, async (req, res) => {

  try{
   const query =   productCompanyInformation

   
   
   const [result] = await pool.query(query);

   
   return res.status(200).send({
       Data: { result },
       status: "success",
   })

   
  }catch (error) {
   console.log(error);
   return res.status(500).send({
     status: "failed",
     message: "INvalid Query",
   });
 }

})

//// give by product ID
productRoute.get("/product-Id-Quantity-information/:id", jwtAuthenticate, async (req, res) => {

  try{
   const query = getQuantityGivenIdInformation
   const values = [req.params.id];
  //  console.log(values)
   
   const [result] = await pool.query(query, values);
   // console.log(result)

   return res.status(200).send({
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
  productRoute,
};
