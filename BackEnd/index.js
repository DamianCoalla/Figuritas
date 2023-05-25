const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes");

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", routes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Servidor levantado en el puerto 3001");
});
