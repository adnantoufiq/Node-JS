const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.set("View engine", "ejs");

app.get("/", (req, res) => {
  res.render("base", { title: "Login System" });
});
