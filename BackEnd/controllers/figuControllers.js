const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  const { user_name, password } = req.body;
  knex("figuritas".usuario).where({ user_name: user_name });
  then(async (resultado) => {
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
      .json({ Message: "The user has successfully logged in", token: token });
  }).catch((error) => {
    res.status(400).json({ error: error.Message });
  });
};
