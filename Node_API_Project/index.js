// uptime monitoring project
// A RESTful API

// dependencies for this projects
const http = require("http");
const url = require("url");

// app object
const app = {};

// configuration object

app.config = {
  port: 3000,
};

// create server

app.createServer = () => {
  const server = http.createServer(app.handleRequest);

  server.listen(app.config.port, () => {
    console.log(`Listening on port " + ${app.config.port}`);
  });
};

// handle requestes and responses

app.handleRequest = (req, res) => {
  // requests handled by users

  // url and parse it

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  console.log(path);

  // response handle from server
  res.end("hello new world ");
};

app.createServer();
