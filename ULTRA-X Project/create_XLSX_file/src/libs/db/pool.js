const { createPool } = require("mysql2/promise");
const pool = createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "evidence_pdf",
});

module.exports = {
  pool,
};
