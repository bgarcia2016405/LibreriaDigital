'use strcit'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BiblioSchema = Schema({
    type: String,
    titulo: String,
    autor: String,
    edicion: String,
    palabrasClave: [],
    temas: [],
    descripccion: String,
    copias: Number,
    disponibles: Number,
    ejemplares: Number,
    frecuenciaActual: String,
    prestados: Number,
    buscados: Number
})

module.exports = mongoose.model('Bibliografia', BiblioSchema);