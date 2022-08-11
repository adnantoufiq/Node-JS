// dependencies

const { StringDecoder } = require("string_decoder");
const url = require("url");

const handler = {};

handler.handleReqRes = (req, res) => {
  // requests handled by users

  // url and parse it

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method.toUpperCase();
  const headers = req.headers;
  const decoder = new StringDecoder("UTF-8");
  let realData = " ";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);
  });

  // response handle from server
  res.end("hello new world i am coming to update all the thinks ");
};

module.exports = handler;
