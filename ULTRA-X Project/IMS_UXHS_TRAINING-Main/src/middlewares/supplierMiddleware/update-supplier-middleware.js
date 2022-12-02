const dateFNS = require("date-fns");
/**
 * This middleware is for parse Supplier body data
 */
const getSupplierBodyData = (req, res, next) => {
    const SUPPLIER_ID = req.params.id;
    const supplierData = {
        SUPPLIER_ID,
        SUPPLIER_COMPANY_NAME: req.body.SUPPLIER_COMPANY_NAME,
        SUPPLIER_CONTACT_NAME: req.body.SUPPLIER_CONTACT_NAME,
        SUPPLIER_CITY: req.body.SUPPLIER_CITY,
        SUPPLIER_COUNTRY: req.body.SUPPLIER_COUNTRY,
        SUPPLIER_PHONE_PRIMARY: req.body.SUPPLIER_PHONE_PRIMARY,
        SUPPLIER_PHONE_OPTIONAL: req.body.SUPPLIER_PHONE_OPTIONAL,
        SUPPLIER_EMAIL: req.body.SUPPLIER_EMAIL,
        SUPPLIER_UPDATED_AT: dateFNS.format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };

    const error = [];
    if (supplierData.SUPPLIER_EMAIL) {
        if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(supplierData.SUPPLIER_EMAIL + '')) {
            error.push("Supplier email is not correct.");
        }
    }
    if (error.length > 0) {
        return res.status(406).send({
            status: "failed",
            message: "invalid-data",
            error
        });
    }

    req.body.supplierData = supplierData;
    next();
};

module.exports = {
    getSupplierBodyData,
};

