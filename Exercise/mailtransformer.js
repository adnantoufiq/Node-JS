var nodemailer = require("nodemailer");
var http = require("http");

http
  .createServer(function (req, res) {
    //res.writeHead(200, {'Content-type': 'text/html'})
    res.write(function (data) {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "adnantoufiq69@gmail.com",
          pass: "xplorerw65i",
        },
      });

      var mailOptions = {
        from: "adnantoufiq69@gmail.com",
        to: "arifulislamtoufiq1@yahoo.com",
        subject: "Sending Email using Node.js",
        text: "That was easy!",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
    return res.end();
  })
  .listen(8080);
