const allInformationData = function (pdfGen) {
  const result = [];
  const data1 = {
    key1: "作業年⽉⽇",
    key2: "2021-08-07 17:24:45",
  };
  const data2 = {
    key1: "作業場所",
    key2: "東京都千代⽥区岩本町3-9-17 スリーセブンビル8F ",
  };
  const data3 = {
    key1: "処理番号",
    key2: "000801",
  };
  const data4 = {
    key1: "消去ソフト",
    key2: pdfGen.erseProduct,
  };
  const data5 = {
    key1: "消去⽅法",
    key2: "Full(0x0000)",
  };
  const data6 = {
    key1: "メーカー ",
    key2: "NEC",
  };
  const data7 = {
    key1: "製品名 ",
    key2: "PC-LL570LG",
  };
  const data8 = {
    key1: "製品シリアル ",
    key2: "7Z10849CA",
  };

  result.push(Object.assign({}, data1));
  result.push(Object.assign({}, data2));
  result.push(Object.assign({}, data3));
  result.push(Object.assign({}, data4));
  result.push(Object.assign({}, data5));
  result.push(Object.assign({}, data6));
  result.push(Object.assign({}, data7));
  result.push(Object.assign({}, data8));

  return result;
};

function createHeaders(keys, widths) {
  const result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      // prompt: keys[i],
      width: widths[i],
      align: "left",
    });
  }
  return result;
}

const headers = createHeaders(["key1", "key2"], [86, 210]);

module.exports = {
  allInformationData,
  headers,
};
