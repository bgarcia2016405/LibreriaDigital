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

    biblioModel.findOneAndUpdate({titulo:titulo}, {} ,(err,bibiFound)=>{
        if(err) return res.status(404).send({report:'Error buscando bibliografia'});

        if(!bibiFound) return res.status(500).send({report:'No existe la bibliografía'});

            biblioModel.findByIdAndUpdate(bibiFound._id, {buscados:(bibiFound.buscados + 1)},(err,bibiEdit)=>{

                if(err) return res.status(404).send({report:'Error la busqueda'});

                if(!bibiEdit) return res.status(500).send({report:'Bibliografía no editada'});

                return res.status(200).send(bibiFound);
            })

        
    })
}

function editarBiblio(req,res){
    var titulo = req.params.titulo;
    var identidad = req.user.rol;
    var params = req.body;

    params.palabrasClave = params.palabrasClave.split(';');
    params.temas = params.temas.split(';');
  
    if(identidad != admin) return res.status(404).send({report:'No es administrador'});

    biblioModel.findOneAndUpdate({titulo:titulo} ,params, {new:true} ,(err,bibiEdit)=>{
        
        if(err) return res.status(404).send({report:'Error editando bibliografia'});

        if(!bibiEdit) return res.status(500).send({report:'Bibliografia no editada'});

        return res.status(200).send(bibiEdit);
    })

}

function eliminarBiblio(req,res){
    var titulo = req.params.titulo;
    var identidad = req.user.rol;

    if(identidad != admin) return res.status(404).send({report:'No es administrador'});

    biblioModel.findOneAndDelete({titulo: titulo}, (err,bibiDelete)=>{
        
        if(err) return res.status(404).send({report:'Error eliminando bibliografia'});

        if(!bibiDelete) return res.status(500).send({report:'Bibliografia no eliminada'});

        return res.status(200).send(bibiDelete);

    })

}

function buscarCopias(req,res){

    var orden = req.params.orden;

    if(orden == 'Mayor'){
        biblioModel.find((err,bibiFound)=>{
            if(err) return res.status(404).send({report:'Error buscando bibliografía'});

            if(bibiFound == '') res.status(500).send({report:'No existen bilbiografias'});

            return res.status(200).send(bibiFound);
        }).sort({copias:-1})
    }

    if(orden == 'Menor'){
        biblioModel.find((err,bibiFound)=>{
            if(err) return res.status(404).send({report:'Error buscando bibliografía'});

            if(bibiFound == '') res.status(500).send({report:'No existen bilbiografias'});

            return res.status(200).send(bibiFound);
        }).sort({copias:1})
    }
}

function buscarDisponibles(req,res){

    var orden = req.params.orden;

    if(orden == 'Mayor'){
        biblioModel.find((err,bibiFound)=>{
            if(err) return res.status(404).send({report:'Error buscando bibliografía'});

            if(bibiFound == '') res.status(500).send({report:'No existen bilbiografias'});

            return res.status(200).send(bibiFound);
        }).sort({disponibles:-1})
    }

    if(orden == 'Menor'){
        biblioModel.find((err,bibiFound)=>{
            if(err) return res.status(404).send({report:'Error buscando bibliografía'});

            if(bibiFound == '') res.status(500).send({report:'No existen bilbiografias'});

            return res.status(200).send(bibiFound);
        }).sort({disponibles:1})
    }
}

function buscarPalabra(req,res){

    var palabra = req.params.palabra;

    biblioModel.find({palabrasClave:palabra},(err,bibiFound)=>{

        if(err) return res.status(404).send({report:'Error buscando bibliografías'});

        if(!bibiFound) return res.status(500).send({report:'Bibliografías no existentes'})

        return res.status(200).send(bibiFound);
    })
}

function buscarPopular(req,res){

    biblioModel.find({},(err,biblioFound)=>{
        if(err) return res.status(404).send({report:'Error buscando bibliografía'});

        if(!biblioFound) return res.status(500).send({report:'Bibliografías no existentes'})

        return res.status(200).send(biblioFound);
    }).sort({prestados:-1}).limit(10)
}

module.exports = {
    crear,
    buscarTitulo,
    editarBiblio,
    eliminarBiblio,
    buscarCopias,
    buscarDisponibles,
    buscarPalabra,
    buscarPopular
}