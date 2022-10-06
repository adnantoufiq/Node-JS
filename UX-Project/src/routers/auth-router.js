const express = require("express");
const authRoute = express.Router();
const { pool } = require("../libs/db/pool");
const { bcrypt } = require("bcrypt");

// const getUserFromBody = (body) => {
//   return {
//     userName: body.USER_NAME,
//     email: body.USER_EMAIL,
//     password: body.USER_PASSWORD,
//   };
// };

authRoute.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.USER_PASSWORD, 10);
    const newUser = new User({
      USER_NAME: req.body.USER_NAME,
      USER_EMAIL: req.body.USER_EMAIL,
      USER_PASSWORD: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "signup successfully ",
    });
  } catch {
    res.status(500).json({ message: "signup failed" });
  }

  // // Validate user object
  // const userPatter = / [A-Za-z .]{3,20}$ /;
  // const emailPattern = /^ [a-zA-Z ._]{3,}[.]{1}[A-Za-z.]{2,6}$/;

  // Check if user already existss

  // If everything passed successfully

  // Now insert the user into the database
  // console.log(USER_NAME);
  var sql = "INSERT INTO user (USER_NAME, USER_EMAIL, USER_PASSWORD) VALUES ? ";

  var values = [
    ["newUser.USER_NAME", "newUser.USER_EMAIL", "newUser.USER_PASSWORD"],
  ];

  pool.query(sql, [values], (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log("entry successfully inserted");
  });
});

module.exports = { authRoute };
