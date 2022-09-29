const { StringDecoder } = require("string_decoder");
const url = require("url");
const routs = require("../allRouteFile/routes");
const {
  notFoundHandler,
} = require("../allRouteFile/routeshandler/notFoundHandler");

// moducle scaffholdings
const handler = {};

handler.handleReqRes = (req, res) => {
  // get all the id number end the route
  const parsedUrl = url.parse(req.url, true);
  //  get he pathname parsdeUrl
  const path = parsedUrl.pathname;
  // maje kiso pele hash or onno value sob bad jabe only last and first has pele nibe
  const realLink = path.replace(/^\/+|\/+$/g, "");
  // get method(get, post, put, delete) name to upper case
  const method = req.method.toUpperCase();
  // get ? a=5&b=6 in header link in object form
  const queryStringObject = parsedUrl.query;
  //    get the header name meta data in object form
  const headersObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    realLink,
    method,
    queryStringObject,
    headersObject,
  };
  // for decode  by encoding utf-8
  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const chosenHandler = routs[realLink] ? routs[realLink] : notFoundHandler;

  //  req on get the decoded buffer data
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  // req end also decode system end
  req.on("end", () => {
    realData += decoder.end();

    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 800;
      payload = typeof payload === "object" ? payload : {};

      // convert to string
      const payloadStings = JSON.stringify(payload);
      res.writeHead(statusCode);
      res.end(payloadStings);
    });

    //for response
    res.end(" add home script");
  });
};

module.exports = handler;
