const {
    isValidCustomerId} = require("../../utilities/customerDelete-validator");
  
  const parseCustomerBodyId = (req, res, next) => {

    const customer = {
        CUSTOMER_ID: req.body.CUSTOMER_ID,
      
    };
  
    if (!isValidCustomerId(customer.CUSTOMER_ID)) {
      res.send.json({
        message: "CUSTOMER_ID-is-not-match"
      })
    }

    req.body.customer = customer;
  
    next();
  };
  
  module.exports = {
    parseCustomerBodyId,
  };
  
