
const generateResponsibleData = function () {
    var result = [];
    const data = {
        "責任者": "印",
    };

    result.push(data);
    return result;
};

function createHeaders(keys, widths) {
    const result = [];
    for (var i = 0; i < keys.length; i += 1) {
        result.push({
            name: keys[i],
            prompt: keys[i],
            align: 'center',
            width: widths[i]
        });
    }
    return result;

    // name: string;
    // prompt: string;
    // align: "left" | "center" | "right";
    // padding: number;
    // width: number;
}

const responsibleHeaders = createHeaders([
    "責任者"
], [
    100,
]);

module.exports = {
    generateResponsibleData,
    responsibleHeaders
}