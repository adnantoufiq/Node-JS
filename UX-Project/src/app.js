require("dotenv").config();

// const { authRoute } = require("./routers/auth-router");
const { usersTable } = require("./users/users-Table");
// other codes
const express = require("express");
const cors = require("cors");
const { pool } = require("./libs/db/pool");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  port declare
const APP_PORT = process.env.appPort;

// app.get("/", (req, res) => {
//   res.send("Hello world this is my world ");
// });

app.get("/createDB", async (req, res) => {
  let sql = "CREATE DATABASE nodemysql ";
  const [res] = await pool.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send("Database created ");
    }
  });
});

// app.use("/auth", authRoute);
app.use("/createTbl", usersTable);

// app listen port
app.listen(APP_PORT, () => {
  console.log(`server listening on port ${APP_PORT}`);
});
