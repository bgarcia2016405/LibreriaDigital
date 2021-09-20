'use strict'

const express = require('express');
var authenticated = require("../middleware/authenticated");
const biblioController = require("../controller/bibliiografia.controller");

var api = express.Router();

api.post('/crearBibliografia', authenticated.ensureAuth, biblioController.crear);

api.get('/buscarId/:sd', biblioController.buscarID);

api.get('/buscarTituloBiblio/:titulo/:tipo', authenticated.ensureAuth, biblioController.buscarTitulo);

api.put('/editarBibliografia/:titulo', authenticated.ensureAuth, biblioController.editarBiblio);

api.delete('/eliminarBibliografia/:titulo', authenticated.ensureAuth, biblioController.eliminarBiblio);

api.get('/buscarCopias/:orden', biblioController.buscarCopias);

api.get('/buscarDisponibles/:orden', biblioController.buscarDisponibles);

api.get('/buscarPlabra/:palabra/:tipo', biblioController.buscarPalabra);

api.get('/buscarPopular/:tipo', biblioController.buscarPopular);

module.exports = api