require("dotenv").config();
const { Pool } = require("pg");
if (!process.env.DATABASE_URL) console.warn("DATABASE_URL no configurada");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "disable" ? false : { rejectUnauthorized: false },
  max: 5,
  connectionTimeoutMillis: 10000,
});
module.exports = pool;
