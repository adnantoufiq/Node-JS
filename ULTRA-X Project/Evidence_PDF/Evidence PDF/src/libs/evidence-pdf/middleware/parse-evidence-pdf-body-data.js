const parseEvidencePdfBodyData = (req, res, next) => {
  const pdfData = req.body.pdfData;
  // console.log(pdfData)
  for (let i = 0; i <= pdfData.length; i++) {
    const Data = {
      company_address: req.body.pdfData[i].company_address,
      processing_number: req.body.pdfData[i].processing_number,
      erase_software: req.body.pdfData[i].erase_software,
      erase_method: req.body.pdfData[i].erase_method,
      vendor_name: req.body.pdfData[i].vendor_name,
      manufacturer: req.body.pdfData[i].manufacturer,
      product_serial: req.body.pdfData[i].product_serial,
      disk_model_no: req.body.pdfData[i].disk_model_no,
      disk_space: req.body.pdfData[i].disk_space,
      serial_no: req.body.pdfData[i].serial_no,
      work_in_charge: req.body.pdfData[i].work_in_charge,
      comment: req.body.pdfData[i].comment,
    };

    //console.log(Data.company_address);

    req.body.pdfData = Data;
    next();
  }
};
module.exports = {
  parseEvidencePdfBodyData,
};
