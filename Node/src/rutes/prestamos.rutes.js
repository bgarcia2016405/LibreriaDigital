'use strict'

const express = require('express');
var authenticated = require("../middleware/authenticated");
const prestaController = require("../controller/prestamos.controller");

var api = express.Router();

api.get('/prestar/:libro', authenticated.ensureAuth, prestaController.prestamo);

api.put('/devolver/:prestamo', authenticated.ensureAuth, prestaController.devolver);

module.exports = api