const fs = require("fs");
const path = require("path");

const getBinaryFont = () => {
  const filePath = path.normalize(`${__dirname}/font/ipaexg.ttf`);

  const fileContent = fs.readFileSync(filePath, "binary");

  return fileContent;
};

module.exports = {
  getBinaryFont,
};
