// module scaffholding
const handler = {};
const fs = require("fs");
const { hash } = require("../../utiilits/utilities");

var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
handler.userHandler = (requestProperties, callback) => {
  const acceptedmethod = ["GET", "POST", "PUT", "DELETE"];
  if (acceptedmethod.indexOf(requestProperties.method) > -1) {
    handler.user[requestProperties.method](requestProperties, callback);
  } else {
    callback(406);
  }
};

handler.user = {};

handler.user.POST = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;
  const poneNum =
    typeof requestProperties.body.poneNum === "string" &&
    requestProperties.body.poneNum.trim().length === 11
      ? requestProperties.body.poneNum
      : false;
  const email =
    typeof requestProperties.body.email === "string" &&
    requestProperties.body.email.trim().length > 0 &&
    requestProperties.body.email === requestProperties.body.email.match(pattern)
      ? requestProperties.body.email
      : false;
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 6 &&
    requestProperties.body.password ===
      requestProperties.body.password.match(pattern)
      ? requestProperties.body.password
      : false;

  if (firstName && lastName && poneNum && email && password) {
    // let usersObject = {

    //   lastName,
    //   poneNum,
    //   email,
    //   password: hash(password),
    // };
    fs.writeFileSync("myFile.txt", "firstName");
  } else {
    callback(400, () => {
      console.log("there is a problem in user requests");
    });
  }
};
handler.user.GET = (requestProperties, callback) => {
  callback(200);
};

handler.user.PUT = (requestProperties, callback) => {};
handler.user.DELETE = (requestProperties, callback) => {};

module.exports = handler;
