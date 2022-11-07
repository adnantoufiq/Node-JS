const parseProductBodyData = (req, res, next) => {


  const evidence_information = {
    work_date: req.body.work_date,
    work_place: req.body.work_place,
    processing_number: req.body.processing_number,
    erasing_software: req.body.erasing_software,
    erasure_method: req.body.erasure_method,
    manufacturer: req.body.manufacturer,
    product_name: req.body.product_name,
    product_serial: req.body.product_serial,
    disk_model_number: req.body.disk_model_number,
    disk_space: req.body.disk_space,
    serial_number: req.body.serial_number,
    comment: req.body.comment,
  };


  // console.log(product);
  req.body.evidence_information = evidence_information;

  next();
};

module.exports = {
  parseProductBodyData,
};
