require("dotenv").config();
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Nelson1943",
    database: "postgres",
  },
});

module.exports = knex;
