// reuire the http
const http = require("http");
const {
  handleReqRes,
} = require("./component/helpForaHandleReqRes/handleReqRes");

const environment = require("./component/environments/environment");
// moduel scaffholdings
const app = {};

// app config
app.config = {
  port: 3000,
};

// createServer
app.createServer = () => {
  const server = http
    .createServer(app.handleReqRes)
    .listen(environment.port, () => {
      console.log(`server listening on ${environment.port}`);
    });
};

app.handleReqRes = handleReqRes;
//  start the server
app.createServer();
