// use createPool from mysql2/promise

const mysql2 = require("mysql2");

// const { DB_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql2.createPool({
  port: process.env.dbPort,
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.dbName,
});

module.exports = {
  pool,
};

// const {pool} = require("")
