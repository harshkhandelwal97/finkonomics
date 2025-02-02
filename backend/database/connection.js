require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

pool.on("error", (err) => {
  console.error("Database connection error:", err);
  process.exit(-1);
});

module.exports = pool;