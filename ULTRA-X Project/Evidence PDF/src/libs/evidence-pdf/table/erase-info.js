const getDate = new Date();
let day = (getDate.getDate() + '').padStart(2, '0');
let month = (getDate.getMonth() + 1 + '').padStart(2, '0');
const year = (getDate.getFullYear() + '').padStart(2, '0');
let hours = (getDate.getHours() + '').padStart(2, '0');;
let minutes = (getDate.getMinutes() + '').padStart(2, '0');
let seconds = (getDate.getSeconds() + '').padStart(2, '0');
const time = `${year}-${month}-${day}   ${hours}:${minutes}:${seconds}`;
const generateEraseData = (pdfData) => {
    const result = [];

    const rowData1 = {
        column1: "作業年⽉⽇",
        column2: time,
    };
    const rowData2 = {
        column1: "作業場所",
        column2: pdfData.company_address,
    };
    const rowData3 = {
        column1: "処理番号",
        column2: pdfData.processing_number,
    };
    const rowData4 = {
        column1: "消去ソフト",
        column2: pdfData.erase_software,
    };
    const rowData5 = {
        column1: "消去⽅法",
        column2: pdfData.erase_method,
    };
    const rowData6 = {
        column1: "メーカー ",
        column2: pdfData.vendor_name,
    };
    const rowData7 = {
        column1: "製品名 ",
        column2: pdfData.manufacturer,
    };
    const rowData8 = {
        column1: "製品シリアル ",
        column2: pdfData.product_serial,
    };

    result.push(rowData1);
    result.push(rowData2);
    result.push(rowData3);
    result.push(rowData4);
    result.push(rowData5);
    result.push(rowData6);
    result.push(rowData7);
    result.push(rowData8);

    return result;
};

function createHeaders(keys, widths) {
    const result = [];
    for (var i = 0; i < keys.length; i += 1) {
        result.push({
            id: keys[i],
            name: keys[i],
            prompt: keys[i],
            width: widths[i],
            align: "left",
            padding: 0,
            height: 50
        });
    }
    return result;
}

const eraseTableHeaders = createHeaders([
    "column1",
    "column2"
], [
    80,
    220
]);

module.exports = {
    generateEraseData,
    eraseTableHeaders,
};