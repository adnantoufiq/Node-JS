const {
    isValidSupplierId} = require("../../utilities/supplierDelete-validator");
  
  const parseSupplierBodyId = (req, res, next) => {

    const supplier = {
      SUPPLIER_ID: req.body.SUPPLIER_ID,
      
    };
  
    if (!isValidSupplierId(supplier.SUPPLIER_ID)) {
      res.send.json({
        message: "SUPPLIER_ID-is-not-match"
      })
    }

    req.body.supplier = supplier;
  
    next();
  };
  
  module.exports = {
    parseSupplierBodyId,
  };
  