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
  figurinesByAlbum,
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
routes.get("/albums/:id", figurinesByAlbum);

module.exports = routes;
