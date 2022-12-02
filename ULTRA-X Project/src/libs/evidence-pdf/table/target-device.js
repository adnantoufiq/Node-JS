
const generateDataTargetDevice = function (pdfData) {
    var result = [];
    const rowData1 = {
        "項": '1',
        "ディスク型番": pdfData.disk_model_no,
        "ディスク容量": pdfData.disk_space,
        "シリアル番号": pdfData.serial_no,
    };
    const rowData2 = {
        "項": '2',
        "ディスク型番": " " || pdfData.disk_model_no,
        "ディスク容量": " " || pdfData.disk_space,
        "シリアル番号": " " || pdfData.serial_no,
    };
    const rowData3 = {
        "項": '3',
        "ディスク型番": " ",
        "ディスク容量": " ",
        "シリアル番号": " ",
    };
    const rowData4 = {
        "項": '4',
        "ディスク型番": " ",
        "ディスク容量": " ",
        "シリアル番号": " ",
    };
    const rowData5 = {
        "項": '5',
        "ディスク型番": " ",
        "ディスク容量": " ",
        "シリアル番号": " ",
    };
    const rowData6 = {
        "項": '6',
        "ディスク型番": " ",
        "ディスク容量": " ",
        "シリアル番号": " ",
    };
    const rowData7 = {
        "項": '7',
        "ディスク型番": " ",
        "ディスク容量": " ",
        "シリアル番号": " ",
    };
    const rowData8 = {
        "項": '8',
        "ディスク型番": " ",
        "ディスク容量": " ",
        "シリアル番号": " ",
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
            name: keys[i],
            prompt: keys[i],
            align: 'center',
            width: widths[i],
        });
    }
    return result;

    // name: string;
    // prompt: string;
    // align: "left" | "center" | "right";
    // padding: number;
    // width: number;
}

const targetTableHeaders = createHeaders([
    "項",
    "ディスク型番",
    "ディスク容量",
    "シリアル番号"
], [
    30,
    180,
    77,
    180
]);

module.exports = {
    generateDataTargetDevice,
    targetTableHeaders
}