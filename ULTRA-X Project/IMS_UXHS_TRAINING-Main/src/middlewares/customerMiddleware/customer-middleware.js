const {
  isValidCustomerFirstName,
  isValidCustomerLastName,
  isValidCustomerCity,
  isValidCustomerCountry,
  isValidCustomerPhonePrimary,
} = require("../../utilities/customer-validator");


const parseCustomerBodyData = (req, res, next) => {
  const customer = {
    CUSTOMER_FIRST_NAME: req.body.CUSTOMER_FIRST_NAME,
    CUSTOMER_LAST_NAME: req.body.CUSTOMER_LAST_NAME,
    CUSTOMER_CITY: req.body.CUSTOMER_CITY,
    CUSTOMER_COUNTRY: req.body.CUSTOMER_COUNTRY,
    CUSTOMER_PHONE_PRIMARY: req.body.CUSTOMER_PHONE_PRIMARY,
    CUSTOMER_PHONE_OPTIONAL: req.body.CUSTOMER_PHONE_OPTIONAL,
  };

  const errors = [];

  if (!isValidCustomerFirstName(customer.CUSTOMER_FIRST_NAME)) {
    errors.push("CUSTOMER_FIRST_NAME-is-not-valid");
  }
  if (!isValidCustomerLastName(customer.CUSTOMER_LAST_NAME)) {
    errors.push("CUSTOMER_LAST_NAME-is-not-valid");
  }
  if (!isValidCustomerCity(customer.CUSTOMER_CITY)) {
    errors.push("CUSTOMER_CITY-is-not-valid");
  }
  if (!isValidCustomerCountry(customer.CUSTOMER_COUNTRY)) {
    errors.push("CUSTOMER_COUNTRY-is-not-valid");
  }
  if (!isValidCustomerPhonePrimary(customer.CUSTOMER_PHONE_PRIMARY)) {
    errors.push("CUSTOMER_PHONE_PRIMARY-is-not-valid");
  }
  if (errors.length >= 1) {
    return res.status(406).send({
      status: "failed",
      message: "invalid-data",
      errors,
    });
  }
  req.body.customer = customer;
  next();
};

module.exports = {
  parseCustomerBodyData,
};
