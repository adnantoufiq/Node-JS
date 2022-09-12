// dependencies

const { StringDecoder } = require("string_decoder");
const url = require("url");
const { notFoundHandler } = require("../handlers/routsHandler/notFoundHandler");
const routs = require("../routs");

const handler = {};

handler.handleReqRes = (req, res) => {
  // requests handled by users

  // url and parse it

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method.toUpperCase();
  const manyPath = path.replace(/^\/+|\/+$/g, "");
  const headersObject = req.headers;
  const stringObject = parsedUrl.query;

  const reqProperties = {
    parsedUrl,
    path,
    method,
    manyPath,
    headersObject,
    stringObject,
  };

  const decoder = new StringDecoder("UTF-8");
  let realData = " ";

  const choseHandler = routs[manyPath] ? routs[manyPath] : notFoundHandler;

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();

    choseHandler(reqProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 404;
      payload = typeof payload === "object " ? payload : {};

      const payloadString = JSON.stringify(payload);

      // return the response
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });

  // response handle from server
  // res.end("hello new world i am coming to update all the thinks ");
};

module.exports = handler;
