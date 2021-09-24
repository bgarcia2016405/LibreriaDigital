'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrestamoSchema = Schema({
    bibliografia: {type: Schema.Types.ObjectId, ref:'Bibliografia'},
    titulo: String, 
    user: {type: Schema.Types.ObjectId, ref:'User'},
    estado: String
})

module.exports = mongoose.model('Prestar', PrestamoSchema)