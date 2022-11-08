const deviceInformationTableData = function (data) {
  const result = [];
  const data1 = {
    項: "1",
    ディスク型番: data.disk_model_number,
    ディスク容量: data.disk_space,
    シリアル番号: data.serial_number,
  };
  const data2 = {
    項: "2",
    ディスク型番: " ",
    ディスク容量: " ",
    シリアル番号: " ",
  };
  const data3 = {
    項: "3",
    ディスク型番: " ",
    ディスク容量: " ",
    シリアル番号: " ",
  };
  const data4 = {
    項: "4",
    ディスク型番: " ",
    ディスク容量: " ",
    シリアル番号: " ",
  };
  const data5 = {
    項: "5",
    ディスク型番: " ",
    ディスク容量: " ",
    シリアル番号: " ",
  };
  const data6 = {
    項: "6",
    ディスク型番: " ",
    ディスク容量: " ",
    シリアル番号: " ",
  };
  const data7 = {
    項: "7",
    ディスク型番: " ",
    ディスク容量: " ",
    シリアル番号: " ",
  };
  const data8 = {
    項: "8",
    ディスク型番: " ",
    ディスク容量: " ",
    シリアル番号: " ",
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
      項: keys[i],
      name: keys[i],
      width: widths[i],
      align: "center",
      padding: 10,
    });
  }
  return result;
}

const deviceInformationTableHeaders = createHeaders(
  ["項", "ディスク型番", "ディスク容量", "シリアル番号"],

  [30, 180, 80, 186]
);
module.exports = {
  deviceInformationTableData,
  deviceInformationTableHeaders,
};
