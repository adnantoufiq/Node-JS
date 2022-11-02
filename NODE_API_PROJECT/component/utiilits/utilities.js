const utilities = {};
const crypto = require("crypto");

// for valid json string from client side

utilities.parseJSON = (jsonString) => {
  let outPut;
  try {
    outPut = JSON.parse(jsonString);
  } catch {
    outPut = {};
  }
  return outPut;
};

utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", "jsdfhjlsdfhls")
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

module.exports = utilities;
