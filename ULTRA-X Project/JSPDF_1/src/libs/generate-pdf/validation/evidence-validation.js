
const isValidWorkDate = (work_date) => {

    if (!work_date) {
        return false;
    }
    return true;
}



const isValidWorkPlace = (work_place) => {

    if (!work_place) {
        return false;
    }
    return true;
}


const isValidProcessingNumber = (processing_number) => {

    if (!processing_number) {
        return false;
    }
    return true;
}
const isValidErasingSoftware = (erasing_software) => {

    if (!erasing_software) {
        return false;
    }
    return true;
}
const isValidErasureMethod = (erasure_method	) => {
  
    if (!erasure_method	) {
        return false;
    }

    return true;

}

const isValidManufacturer= (manufacturer) => {
  
    if (!manufacturer) {
        return false;
    }

    return true;

}
const isValidProductName= (product_name) => {
  
    if (!product_name) {
        return false;
    }

    return true;

}
const isValidProductSerial= (product_serial) => {
  
    if (!product_serial) {
        return false;
    }

    return true;

}
const isValidDiskModelNumber= (disk_model_number) => {
  
    if (!disk_model_number) {
        return false;
    }

    return true;

}
const isValidDiskSpace= (disk_space) => {
  
    if (!disk_space) {
        return false;
    }

    return true;

}

const isValidSerialNumber= (serial_number) => {
  
    if (!serial_number) {
        return false;
    }

    return true;

}




module.exports = {
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
    isValidSerialNumber
    
    
}