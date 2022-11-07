const {
  yearFinalFormate,
  monthFinalFormate,
  dateFinalFormate,
  hourFinalFormate,
  mntFinalFormate,
  secFinalFormate,
} = require("../dateTimeFormate/formate");

const dateTime = `${yearFinalFormate}-${monthFinalFormate}-${dateFinalFormate}  ${hourFinalFormate}:${mntFinalFormate}:${secFinalFormate}`;

const allInformationData = function (data) {
  const result = [];
  const data1 = {
    key1: "作業年⽉⽇",
    key2: dateTime,
  };
  const data2 = {
    key1: "作業場所",
    key2: data.work_place,
  };
  const data3 = {
    key1: "処理番号",
    key2: data.processing_number,
  };
  const data4 = {
    key1: "消去ソフト",
    key2: data.erasing_software,
  };
  const data5 = {
    key1: "消去⽅法",
    key2: data.erasure_method,
  };
  const data6 = {
    key1: "メーカー ",
    key2: data.manufacturer,
  };
  const data7 = {
    key1: "製品名 ",
    key2: data.product_name,
  };
  const data8 = {
    key1: "製品シリアル ",
    key2: data.product_serial,
  };

  // console.log(data.erase_product);

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
