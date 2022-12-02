const {
  // isValidSupplierId,
  isValidProductName,
  isValidProductPrice,
  isValidProductPackage,
  isValidProductImage,
} = require("../../utilities/product-validator");



const parseProductBodyData = (req, res, next) => {
  
  const product = {

    SUPPLIER_ID: req.body.SUPPLIER_ID,
    PRODUCT_NAME: req.body.PRODUCT_NAME,
    PRODUCT_UNIT_PRICE: req.body.PRODUCT_UNIT_PRICE,
    PRODUCT_PACKAGE: req.body.PRODUCT_PACKAGE,
    PRODUCT_IMAGE: req.body.PRODUCT_IMAGE,
  };


 

  const errors = [];

   if (!isValidProductName(product.PRODUCT_NAME)) {
    errors.push("PRODUCT_NAME-is-not-valid");

  }if (!isValidProductPrice(product.PRODUCT_UNIT_PRICE)) {
    errors.push("PRODUCT_UNIT_PRICE-is-not-valid");

  }  if (!isValidProductPackage(product.PRODUCT_PACKAGE)) {
    errors.push("PRODUCT_PACKAGE-is-not-valid");

  } if (!isValidProductImage(product.PRODUCT_IMAGE)) {
    errors.push("PRODUCT_IMAGE-is-not-valid");

  }
  if (errors.length >= 1) {
    return res.status(406).send({
      status: "failed",
      message: "invalid-data",
      errors,
    });
  }

  req.body.product = product;

  next();
};

module.exports = {
  parseProductBodyData,
};
