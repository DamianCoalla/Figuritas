const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  const { user_name, password } = req.body;
  knex("figuritas.usuario")
    .where({ user_name: user_name })
    .then(async (resultado) => {
      if (!resultado.length) {
        res.status(404).json({ error: "The user is not registered" });
        return;
      }
      const validatePassword = await bcrypt.compare(
        password,
        resultado[0].password
      );
      if (!validatePassword) {
        res.status(400).json({ error: "Invalid username and/or password" });
        return;
      }
      const token = jwt.sign(
        { user_name: resultado[0].user_name },
        process.env.TOKEN_SECRET
      );
      res
        .status(200)
        .json({ message: "The user has successfully logged in", token: token });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.userRegister = async (req, res) => {
  const { nombre, user_name, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordEncript = await bcrypt.hash(password, salt);
  try {
    const resultado = await knex("figuritas.usuario").insert({
      nombre: nombre,
      user_name: user_name,
      password: passwordEncript,
    });
    res.status(200).json({ message: "The user has successfully registered" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.allFigurines = async (req, res) => {
  try {
    const resultado = await knex("figuritas.figuritas")
      .select(
        "figuritas.figuritas.id",
        "figuritas.figuritas.nombre",
        "figuritas.figuritas.tengo",
        "figuritas.figuritas.cantidad",
        "figuritas.figuritas.imagen",
        "figuritas.album.nombre as album_nombre",
        "figuritas.album.imagen as album_imagen"
      )
      .innerJoin(
        "figuritas.album",
        "figuritas.figuritas.categoria",
        "figuritas.album.id"
      );
    const figurines = resultado.map((figurita) => {
      const color = figurita.tengo ? "color-normal" : "color-gris";
      const addButton = figurita.tengo
        ? ""
        : `<button class="add-button" data-id="${figurita.id}">Add</button>`;
      const cantidad = figurita.tengo
        ? `<span class="cantidad"> ${figurita.cantidad}</span>`
        : "";
      return { ...figurita, color, addButton, cantidad };
    });
    res.status(200).json({ figurines: resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
