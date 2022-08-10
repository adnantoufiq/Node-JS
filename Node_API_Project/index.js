// uptime monitoring project
// A RESTful API

// dependencies for this projects
const http = require("http");

// app object
const app = {};

// configuration object

const config = {
  PORT: 3000,
};

// create server

app.createServer = () => {
  const server = http.createServer(handleRequest);

  server.listen(app.config.PORT, () => {
    console.log("Listening on port " + app.config.PORt);
  });
};

// handle requestes and responses

app.handleRequest = (req, res) => {
  res.end("hello");
};
