
const dateFNS = require("date-fns");

/**
 * This middleware is for parse Customer body data
 */
const getCustomerBodyData = async (req, res, next) => {
  const CUSTOMER_ID = req.params.id;
  const customerData = {
    CUSTOMER_ID,
    CUSTOMER_FIRST_NAME: req.body.CUSTOMER_FIRST_NAME,
    CUSTOMER_LAST_NAME: req.body.CUSTOMER_LAST_NAME,
    CUSTOMER_CITY: req.body.CUSTOMER_CITY,
    CUSTOMER_COUNTRY: req.body.CUSTOMER_COUNTRY,
    CUSTOMER_PHONE_PRIMARY: req.body.CUSTOMER_PHONE_PRIMARY,
    CUSTOMER_PHONE_OPTIONAL: req.body.CUSTOMER_PHONE_OPTIONAL,
    CUSTOMER_UPDATED_AT: dateFNS.format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  };
  req.body.customerData = customerData;
  next();
};

module.exports = {
  getCustomerBodyData,
};
