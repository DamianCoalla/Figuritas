const express = require("express");
const {
  userLogin,
  userRegister,
  allFigurines,
  updateFigurita,
  needFigurines,
  repeatedFigurines,
  incrementF,
  decrementF,
  getAlbums,
} = require("../controllers/figuControllers");
const routes = express.Router();

routes.post("/login", userLogin);
routes.post("/register", userRegister);
routes.get("/all", allFigurines);
routes.put("/figurines/:id", updateFigurita);
routes.get("/need", needFigurines);
routes.get("/repeated", repeatedFigurines);
routes.put("/increment/:id", incrementF);
routes.put("/decrement/:id", decrementF);
routes.get("/albums", getAlbums);

module.exports = routes;
