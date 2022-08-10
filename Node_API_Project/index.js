// uptime monitoring project
// A RESTful API

// dependencies for this projects
const http = require("http");

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
  res.end("hello ");
};

app.createServer();
