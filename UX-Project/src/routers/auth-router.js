const express = require("express");
const authRoute = express.Router();

authRoute.post("/signup", (req, res) => {
  res.send("please sign up first");
  // Your codes here...
});

module.exports = { authRoute };
