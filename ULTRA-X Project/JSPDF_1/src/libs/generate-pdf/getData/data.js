const {
  isValidWorkDate,
  isValidWorkPlace,
  isValidProcessingNumber,
  isValidErasingSoftware,
  isValidErasureMethod,
  isValidManufacturer,
  isValidProductName,
  isValidProductSerial,
  isValidDiskModelNumber,
  isValidDiskSpace,
  isValidSerialNumber,
} = require("../validation/evidence-validation");

const getEvidenceInformationData = (req, res, next) => {
  const arrayData = req.body;
  // console.log(arrayData);

  for (let i = 0; i < arrayData.length; i++) {
    const evidence_information = {
      work_date: arrayData.work_date,
      work_place: arrayData.work_place,
      processing_number: arrayData.processing_number,
      erasing_software: arrayData.erasing_software,
      erasure_method: arrayData.erasure_method,
      manufacturer: arrayData.manufacturer,
      product_name: arrayData.product_name,
      product_serial: arrayData.product_serial,
      disk_model_number: arrayData.disk_model_number,
      disk_space: arrayData.disk_space,
      serial_number: arrayData.serial_number,
      comment: arrayData.comment,
    };

    const errors = [];

    if (!isValidWorkDate(evidence_information.work_date)) {
      errors.push("Work-date-is-not-null");
    }
    if (!isValidWorkPlace(evidence_information.work_place)) {
      errors.push("Work-place-is-not-null");
    }
    if (!isValidProcessingNumber(evidence_information.processing_number)) {
      errors.push("Processing-number-is-not-null");
    }
    if (!isValidErasingSoftware(evidence_information.erasing_software)) {
      errors.push("Erasing-Software-name-is-not-null");
    }
    if (!isValidErasureMethod(evidence_information.erasure_method)) {
      errors.push("Erasure-method-is-not-null");
    }
    if (!isValidManufacturer(evidence_information.manufacturer)) {
      errors.push("Manufacturer-is-not-null");
    }
    if (!isValidProductName(evidence_information.product_name)) {
      errors.push("Product-name-is-not-null");
    }
    if (!isValidProductSerial(evidence_information.product_serial)) {
      errors.push("product_serial-is-not-null");
    }
    if (!isValidDiskModelNumber(evidence_information.disk_model_number)) {
      errors.push("disk_model_number-is-not-null");
    }
    if (!isValidDiskSpace(evidence_information.disk_space)) {
      errors.push("disk_space-is-not-null");
    }
    if (!isValidSerialNumber(evidence_information.serial_number)) {
      errors.push("serial_number-is-not-null");
    }
    if (errors.length >= 1) {
      return res.status(406).send({
        status: "failed",
        message: "invalid-data",
        errors,
      });
    }

    // console.log(product);
    req.body.arrayData = evidence_information;

    next();
  }
};

module.exports = {
  getEvidenceInformationData,
};
