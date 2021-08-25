'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const biblioModel = require("../models/bibliografia.model");

const uno = 'Libro'
const dos = 'Revista'
const estudiante = 'estudiante'
const bibliotecario = 'bibliotecario';
const admin = 'admin';

function crear(req,res){
    var authorization = req.user.rol;
    var params = req.body;
    var BiblioModel = biblioModel();

    if(authorization != admin) return res.status(404).send({report:'No es administrador'});

    BiblioModel.type = params.type;
    BiblioModel.titulo = params.titulo;
    BiblioModel.autor = params.autor;
    BiblioModel.edicion = params.edicion;
    BiblioModel.palabrasClave = params.palabrasClave.split(';');
    BiblioModel.temas = params.temas.split(';');
    BiblioModel.descripccion = params.descripccion;
    BiblioModel.copias = params.copias;
    BiblioModel.disponibles = params.disponibles;
    BiblioModel.ejemplares = params.ejemplares;
    BiblioModel.frecuenciaActual = params.frecuenciaActual;

        biblioModel.findOne({titulo:BiblioModel.titulo},(err,biblioFound)=>{

            if(err) return res.status(404).send({report:'Error buscando bibliografia'});

            if(biblioFound) return res.status(500).send({report:'El libro ya existe', biblioFound});

                 BiblioModel.save((err,bibi)=>{

                    if(err) return res.status(404).send({report:'Error guardando la bibliografia'});

                    if(!bibi) return res.status(500).send({report:'Bibliografia no guardada'});

                    return res.status(200).send(bibi);
                })
     
        })  


 
}

function buscarTitulo(req,res){
    var titulo = req.params.titulo;
    var identidad = req.user.rol;

    
    if(authorization != admin) return res.status(404).send({report:'No es administrador'});

    biblioModel.find({titulo:titulo}, (err,bibiFound)=>{
        if(err) return res.status(404).send({report:'Error buscando bibliografia'});

        if(!bibiFound) return res.status(500).send({report:'No existe el libro'});

        return res.status(200).send(bibiFound);
    })
}




module.exports = {
    crear,
    buscarTitulo
}