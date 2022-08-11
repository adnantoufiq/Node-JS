// uptime monitoring project
// A RESTful API

// dependencies for this projects
const http = require("http");
// imports from another folder
const { handleReqRes } = require("./helpers/handleReqRes");

// app object
const app = {};

// configuration object
app.config = {
  port: 3000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);

  server.listen(app.config.port, () => {
    console.log(`Listening on port " + ${app.config.port}`);
  });
};

// handle requestes and responses

app.handleReqRes = handleReqRes;

app.createServer();
