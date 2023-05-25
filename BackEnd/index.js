const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
/* const cookieParser = require("cookie-parser"); */
const cors = require("cors");
require("dotenv").config();
/* const inmueblesRoutes = require("./routes/inmueblesRoutes"); */

//creamos el servidor con express
const app = express();

//middleware    man in the middle
app.use(morgan("dev"));
app.use(bodyParser.json());
/* app.use(cookieParser()); */
app.use(cors());

// colocar rutas
/* app.use("/api", inmueblesRoutes); */

// levantar el servidor en un puerto
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Servidor levantado en el puerto 3001");
});
