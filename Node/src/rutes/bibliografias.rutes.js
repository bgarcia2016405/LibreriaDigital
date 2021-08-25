'use strict'

const express = require('express');
var authenticated = require("../middleware/authenticated");
const biblioController = require("../controller/bibliiografia.controller");

var api = express.Router();

api.post('/crearBibliografia', authenticated.ensureAuth, biblioController.crear);

api.get('/buscarTituloBiblio/:titulo', authenticated.ensureAuth, biblioController.buscarTitulo);

module.exports = api