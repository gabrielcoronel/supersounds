const mongoose = require("mongoose");

// El esquema para representar una pista,
// incluye el titulo, un enlace al archivo que
// contiene el audio y un vector de categorias
const schema  = new mongoose.Schema({
    title: String,
    audioUri: String,
    categories: [String]
});

// Se compila el esquema en un modelo
const trackModel = new mongoose.model("Track", schema);

// Este archivo es el repositorio de todas las pistas
// es una abstraccion de la logica de negocios de la
// aplicacion sobre los metodos de persistencia de
// mongoose (trackModel)

// Inserta una pista en la coleccion de pistas
const add = async (track) => {
    await trackModel.create(track);
};

// Encuentra todas las pistas en la coleccion de pistas
const getAll = async () => {
    const tracks = await trackModel.find();
    const reversedTracks = tracks.reverse();

    return reversedTracks;
};

// Encuentra una pista puntual mediante su identificador
// unico en la coleccion de pistas
const getById = async (id) => {
    const track = await trackModel.findById(id);

    return track;
};

// Encuentra las pistas que incluyen (sin considerar mayusculas)
// a @title en su titulo y @categories en sus categorias
const filter = async (title, categories) => {
    // Checkea que contenga a @title mediante una expresión regular
    const query = {
        title: {
            $regex: title,
            $options: "i"
        },
    };

    // Si se proveen categorías, checkea que tenga esas categorías
    if (categories.length !== 0) {
        query.categories = {
            $all: categories
        }
    }

    const tracks = await trackModel.find(query);

    return tracks;
};

// Actualiza a la pista con el id @id con los datos
// que tiene el objeto @track
const update = async (id, track) => {
    await trackModel.updateOne({ _id: id }, track);
};

// Elimina a la pista con el id @id
const removeOne = async (id) => {
    await trackModel.deleteOne({ _id: id });
};

module.exports = {
    add,
    getAll,
    getById,
    filter,
    update,
    removeOne
};