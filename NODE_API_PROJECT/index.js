const http = require("http");

const app = {};

app.config = {
  port: 3000,
};

app.createServer = () => {
  const server = http.createServer((req, res) => {
    server.listen(app.config.port, () => {
      console.log(`server listening on ${app.config.port}`);
    });
  });
};

app.handleReqRes = (req, res) => {
  res.end("home page");
};
app.createServer();
