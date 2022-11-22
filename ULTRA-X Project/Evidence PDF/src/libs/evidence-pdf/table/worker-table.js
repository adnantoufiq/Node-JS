
const generateWorkerData = function () {
    var result = [];
    const data1 = {
        '作業者': "印",

    }

    result.push(Object.assign({}, data1));

    return result;
};

function createHeaders(keys, widths) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
        result.push({
            name: keys[i],
            prompt: keys[i],
            align: 'center',
            width: widths[i]

        });
    }
    return result;
}

const workerHeaders = createHeaders([
    "作業者"
],
    [
        100
    ]);
module.exports = {
    generateWorkerData,
    workerHeaders
}