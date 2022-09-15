var http = require("http");
var fs = require("fs");
var url = require("url");

http
  .createServer(function (req, res) {
    var p = url.parse(req.url, true);
    var filename = "." + p.pathname;
    //Open a file on the server and return its content:
    fs.readFile("index.html", function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-type": "text/html" });
        return res.end("there was and error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
