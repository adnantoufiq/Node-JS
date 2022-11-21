const { createPool } = require("mysql2/promise");

console.log("From env", process.env.DB_PORT);

const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = {
  pool,
};
