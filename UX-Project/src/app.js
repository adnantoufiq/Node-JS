require("dotenv").config();

const { authRoute } = require("./routers/auth-router");
// other codes
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  port declare
const APP_PORT = process.env.appPort;

// app.get("/", (req, res) => {
//   res.send("Hello world this is my world ");
// });

app.use("/auth", authRoute);

// app listen port
app.listen(APP_PORT, () => {
  console.log(`server listening on port ${APP_PORT}`);
});
