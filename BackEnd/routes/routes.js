const express = require("express");
const routes = express.Router();

routes.post("/login", userLogin);

module.exports = routes;
