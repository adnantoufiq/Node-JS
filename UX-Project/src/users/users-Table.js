const express = require("express");
const usersTable = express.Router();
const { pool } = require("../libs/db/pool");

usersTable.post("/createUserTable", (req, res) => {
  let sql = `CREATE TABLE USER  ( 
        USER_ID INT(6)  AUTO_INCREMENT PRIMARY KEY, 
        USER_NAME VARCHAR(255) NOT NULL,
        USER_FIRST_NAME VARCHAR(255), 
        USER_LAST_NAME VARCHAR(255),
        USER_EMAIL VARCHAR(255) NOT NULL, 
        USER_PHONE_PRIMARY VARCHAR(255), 
        USER_PHONE_OPTIONAL VARCHAR(255),
        USER_PASSWORD VARCHAR(255) NOT NULL
        )`;

  pool.query(sql, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(` user table created successfully ${data}`);
    }
  });

  // Your codes here...
});

module.exports = { usersTable };
