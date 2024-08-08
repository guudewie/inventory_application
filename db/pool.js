const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
});
