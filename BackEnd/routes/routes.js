const express = require("express");
const {
  userLogin,
  userRegister,
  allFigurines,
} = require("../controllers/figuControllers");
const routes = express.Router();

routes.post("/login", userLogin);
routes.post("/register", userRegister);
routes.get("/all", allFigurines);

module.exports = routes;
