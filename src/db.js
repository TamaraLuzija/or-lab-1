const { join } = require("path");
const { Pool } = require("pg");

require("dotenv").config({ path: join(__dirname, "../.env") });

module.exports = () => {
  return new Pool({
    connectionString: `postgres://${process.env["DB_USER"]}:${process.env["DB_PASS"]}@localhost/or-lab`,
  });
};
