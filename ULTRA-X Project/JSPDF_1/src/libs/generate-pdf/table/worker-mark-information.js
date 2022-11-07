const workerInformationData = function (data) {
  const result = [];
  const data1 = {
    key1: "作業者",
  };
  const data2 = {
    key1: "印",
  };

  result.push(Object.assign({}, data1));
  result.push(Object.assign({}, data2));

  return result;
};

function createHeaders(keys) {
  const result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 95,
      align: "center",
    });
  }
  return result;
}

const workerMarkData = createHeaders(["key1"]);

module.exports = {
  workerInformationData,
  workerMarkData,
};
