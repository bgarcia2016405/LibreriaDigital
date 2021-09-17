'use strict'

const express = require('express');
var authenticated = require("../middleware/authenticated");
const prestaController = require("../controller/prestamos.controller");

var api = express.Router();

api.get('/prestar/:libro', authenticated.ensureAuth, prestaController.prestamo);

api.get('/devolver/:prestamo', authenticated.ensureAuth, prestaController.devolver);

api.get('/historial', authenticated.ensureAuth, prestaController.historial)

api.get('/posesion', authenticated.ensureAuth, prestaController.posesion)

module.exports = api