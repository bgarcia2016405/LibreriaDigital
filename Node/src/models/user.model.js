'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    IDUser: String,
    nombres: String,
    apellidos: String,
    usuario: String, 
    eMail: String,
    rol: String,
    password: String
})

module.exports = mongoose.model('User', UserSchema);
