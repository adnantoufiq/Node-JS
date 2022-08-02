const http = require("http");

const server = http.createServer((req, res) => {
  // res.write("Welcome");
  // res.write("hello world");
  res.end();
});

server.listen(3000);

console.log("server listing on port 3000");
