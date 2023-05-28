const express = require("express");
const {
  userLogin,
  userRegister,
  allFigurines,
  updateFigurita,
  needFigurines,
  repeatedFigurines,
} = require("../controllers/figuControllers");
const routes = express.Router();

routes.post("/login", userLogin);
routes.post("/register", userRegister);
routes.get("/all", allFigurines);
routes.put("/figurines/:id", updateFigurita);
routes.get("/need", needFigurines);
routes.get("/repeated", repeatedFigurines);

module.exports = routes;
