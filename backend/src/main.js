const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

// Variables de entorno
const PORT = process.PORT;
const MONGODB_CONNECTION_URI = process.MONGODB_CONNECTION_URI;

const api = express();

// Middleware necesario
api.use(bodyParser.json({ limit: "50mb" })); // Parsear JSON
api.use(morgan("tiny")); // Logging de las solicitudes HTTP
api.use("/tracks", express.static("tracks")); // Archivos estáticos de las pistas

// El servicio de las pistas
const tracksRouter = require("./routers/tracksRouter.js");
api.use("/rpc", tracksRouter);

// Se conecta al base de datos en MongoDB Atlas
mongoose
    .connect(MONGODB_CONNECTION_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

// Se inicia el servidor en puerto seleccionado
api.listen(PORT, () => console.log(`Server listening in port ${PORT}`));