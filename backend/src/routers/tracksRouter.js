const express = require("express");
const multer = require("multer");

// Este archivo define el servicio que permite
// interactuar con el repositorio de pistas
// Es decir, expona la API mediante HTTP para interactuar
// con la base de datos mediante el repositorio

// El repositorio a consumir
const trackService = require("../services/tracksService.js");

// Router que expone el servicio
const router = express.Router();

// Middleware para procesar archivo de form-data
const uploader = multer({ dest: "./tracks" });

// Ruta post que crea una nueva pista
router.post("/Tracks.add", uploader.single("audio"), (req, res) => {
    const track = req.body;
    const audioFileName = req.file.filename;
    const audioUri = `http://localhost:8080/user-content/${audioFileName}`;

    trackService
        .add({ ...track, audioUri })
        .catch((error) => res.status(400).send(error));
});

// Ruta post que semanticamente corresponde a un get
// Se usa el verbo POST por conveniencia a la hora de
// recibir el parámetro de categorías ya que recibir un
// vector mediante el query-string es incoveniente para
// el frontend

// Devuelve a todas las pistas que "coincidan" con el
// nombre y categorias dados. Lanza el error 404
// si no se encuentra
router.post("/Tracks.filter", (req, res) => {
    const { title, categories } = req.body;

    trackService
        .filter(title, categories)
        .then((tracks) => res.json(tracks))
        .catch((error) => res.status(404).send(error));
});

// Devuelve a la pista que tenga el id dado por
// el parámetro de la ruta. Lanza el error 404
// si no se encuentra
router.post("/Tracks.getById", (req, res) =>  {
    const id = req.body.id;

    trackService
        .getById(id)
        .then((track) => res.json(track))
        .catch((error) => res.status(404).send(error));
});

// Devuelve a todas las pistas disponibles en el repositorio
router.post("/Tracks.getAll", (_, res) => {
    trackService
        .getAll()
        .then((tracks) => res.json(tracks))
        .catch((error) => res.status(400).send(error));
});

// Actualiza a la pista con con id dado por el parámetro
// de la ruta con las datos dados
router.post("/Tracks.updateOne", uploader.single("audio"), (req, res) => {
    const id = req.body.id;

    delete req.body.id;

    const track = req.body;

    const updatedTrack = { ...track };

    // Si se envía un archivo, se inserta en la base de datos
    if (req.file !== undefined) {
        updatedTrack.audioUri
            = `http://localhost:8080/user-content/${req.file.filename}`;
    }

    trackService
        .update(id, updatedTrack)
        .catch((error) => res.status(400).send(error));
});

// Elimina a la pista con el id del parámetro de la ruta
// en el repositorio
router.post("/Tracks.removeOne", (req, res) => {
    const id = req.body.id;

    trackService
        .removeOne(id)
        .catch((error) => res.status(400).send(error));
});

module.exports = router;