const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.DATABASE_LOCAL_URL,
});
