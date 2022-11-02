const {
  isValidSupplierCompanyName,
  isValidSupplierContactName,
  isValidSupplierCity,
  isValidSupplierCountry,
  isValidSupplierPhonePrimary,
  isValidSupplierEmail,
} = require("../../utilities/supplier-validator");

const parseSupplierBodyData = (req, res, next) => {
  const supplier = {
    SUPPLIER_COMPANY_NAME: req.body.SUPPLIER_COMPANY_NAME,
    SUPPLIER_CONTACT_NAME: req.body.SUPPLIER_CONTACT_NAME,
    SUPPLIER_CITY: req.body.SUPPLIER_CITY,
    SUPPLIER_COUNTRY: req.body.SUPPLIER_COUNTRY,
    SUPPLIER_PHONE_PRIMARY: req.body.SUPPLIER_PHONE_PRIMARY,
    SUPPLIER_PHONE_OPTIONAL: req.body.SUPPLIER_PHONE_OPTIONAL,
    SUPPLIER_EMAIL: req.body.SUPPLIER_EMAIL,
  };

  const errors = [];

  if (!isValidSupplierCompanyName(supplier.SUPPLIER_COMPANY_NAME)) {
    errors.push("SUPPLIER_COMPANY_NAME-is-not-valid");
  }
  if (!isValidSupplierContactName(supplier.SUPPLIER_CONTACT_NAME)) {
    errors.push("SUPPLIER_CONTACT_NAME-is-not-valid");
  }
  if (!isValidSupplierCity(supplier.SUPPLIER_CITY)) {
    errors.push("SUPPLIER_CITY-is-not-valid");
  }
  if (!isValidSupplierCountry(supplier.SUPPLIER_COUNTRY)) {
    errors.push("SUPPLIER_COUNTRY-is-not-valid");
  }
  if (!isValidSupplierPhonePrimary(supplier.SUPPLIER_PHONE_PRIMARY)) {
    errors.push("SUPPLIER_PHONE_PRIMARY-is-not-valid");
  }
  if (!isValidSupplierEmail(supplier.SUPPLIER_EMAIL)) {
    errors.push("SUPPLIER_EMAIL-is-not-valid");
  }

  if (errors.length >= 1) {
    return res.status(406).send({
      status: "failed",
      message: "invalid-data",
      errors,
    });
  }

  req.body.supplier = supplier;

  next();
};

module.exports = {
  parseSupplierBodyData,
};
