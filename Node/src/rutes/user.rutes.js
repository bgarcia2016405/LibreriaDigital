'use strict'

const express = require("express");
var authenticated = require("../middleware/authenticated");
const userController = require("../controller/user.controller");

var api = express.Router();

api.post('/Login', userController.Login);

api.post('/crearUsuario', authenticated.ensureAuth, userController.createUser);

api.delete('/eliminarUsuario/:idUser', authenticated.ensureAuth, userController.eliminarUsuario);

api.put('/actualizarUsuario/:idUser', authenticated.ensureAuth, userController.editarUsurio);

api.get('/usuarioId/:idUser', authenticated.ensureAuth, userController.usuarioId);

api.get('/mostrarTipoUsuario/:typo', authenticated.ensureAuth, userController.usuarioTipo);

api.get('/listarUsuarios', authenticated.ensureAuth, userController.listarUsuario);

module.exports = api;