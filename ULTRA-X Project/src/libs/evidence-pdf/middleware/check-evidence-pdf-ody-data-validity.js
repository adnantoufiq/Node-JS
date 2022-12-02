/**
 * @author Md. Majedul Islam,
 * Software Engineer,
 * Ultra-X BD Ltd.
 *
 * @copyright All right reserved Ultra-X Asia Pacific
 * 
 * @description This function check the thable data validity
 * 
 */
const checkEvidencePdfBodyDataValidity = (req, res, next) => {
    const pdfData = req.body.pdfData;
    let errors = [];
    for (let i = 0; i < pdfData.length; i++) {
        const Data = {
            company_address: pdfData[i].company_address,
            processing_number: pdfData[i].processing_number,
            erase_software: pdfData[i].erase_software,
            erase_method: pdfData[i].erase_method,
            vendor_name: pdfData[i].vendor_name,
            manufacturer: pdfData[i].manufacturer,
            product_serial: pdfData[i].product_serial,
            disk_model_no: pdfData[i].disk_model_no,
            disk_space: pdfData[i].disk_space,
            serial_no: pdfData[i].serial_no,
            comment: pdfData[i].comment
        }

        if (!Data.company_address) {
            errors.push("company_address-can-not-be-empty");
        }
        if (!Data.processing_number) {
            errors.push("processing_number-can-not-be-empty");
        }
        if (!Data.erase_software) {
            errors.push("erase_software-can-not-be-empty");
        }
        if (!Data.erase_method) {
            errors.push("erase_method-can-not-be-empty");
        }
        if (!Data.vendor_name) {
            errors.push("vendor_name-can-not-be-empty");
        }
        if (!Data.manufacturer) {
            errors.push("manufacturer-can-not-be-empty");
        }
        if (!Data.product_serial) {
            errors.push("product_serial-can-not-be-empty");
        }
        if (!Data.disk_model_no) {
            errors.push("disk_model_no-can-not-be-empty");
        }
        if (!Data.disk_space) {
            errors.push("disk_space-can-not-be-empty");
        }
        if (!Data.serial_no) {
            errors.push("serial_no-can-not-be-empty");
        }
    }

    if (errors.length >= 1) {
        return res.status(406).send({
            status: "failed",
            message: "invalid-data",
            errors,
        });
    } else {
        req.body.pdfData = pdfData;
        next();
    }
}

module.exports = {
    checkEvidencePdfBodyDataValidity
}