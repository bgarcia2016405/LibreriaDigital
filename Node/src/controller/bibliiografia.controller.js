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
    BiblioModel.prestados = 0;
    BiblioModel.buscados = 0;

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

function buscarID(req,res){
    var id = req.params.sd;

    biblioModel.findById(id, (err,bibiFound)=>{
        if(err) return res.status(404).send({report:'Error buscando bibliografia'});

        if(!bibiFound) return res.status(404).send({report:'No existe la bibliografía'});

        return res.status(200).send(bibiFound); 
    })
}

function buscarTitulo(req,res){
    var titulo = req.params.titulo;
    var tipo = req.params.tipo;

    biblioModel.findOne({titulo:titulo, type:tipo},(err,bibiFound)=>{
        if(err) return res.status(404).send({report:'Error buscando bibliografia'});

        if(!bibiFound) return res.status(404).send({report:'No existe la bibliografía'});

            biblioModel.findByIdAndUpdate(bibiFound._id, {buscados:(bibiFound.buscados + 1)},(err,bibiEdit)=>{

                if(err) return res.status(404).send({report:'Error la busqueda'});

                if(!bibiEdit) return res.status(500).send({report:'Bibliografía no editada'});

                return res.status(200).send([bibiFound]);
            })

        
    })
}

function editarBiblio(req,res){
    var titulo = req.params.titulo;
    var identidad = req.user.rol;
    var params = req.body;

    params.palabrasClave = params.palabrasClave.toString().split(',');
    params.temas = params.temas.toString().split(',');

    
  
    if(identidad != admin) return res.status(404).send({report:'No es administrador'});

    biblioModel.findOne({titulo:titulo}, (err,bibiFound)=>{

        if(err) return res.status(404).send({report:'Error buscando bibliografia'});

        if(bibiFound) return res.status(404).send({report:'El titulo ya existe'});

            biblioModel.findOneAndUpdate({_id:params._id} ,params, {new:true} ,(err,bibiEdit)=>{
            
                if(err) return res.status(404).send({report:'Error editando bibliografia'});
        
                if(!bibiEdit) return res.status(404).send({report:'Bibliografia no editada'});
        
                return res.status(200).send(bibiEdit);
            })
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
    var type = req.params.tipo;

    

    if(orden == 'Mayor'){
        biblioModel.find({type:type},(err,bibiFound)=>{
            if(err) return res.status(404).send({report:'Error buscando bibliografía'});

            if(bibiFound == '') res.status(500).send({report:'No existen bilbiografias'});

            return res.status(200).send(bibiFound);
        }).sort({copias:-1})
    }

    if(orden == 'Menor'){
        biblioModel.find({type:type},(err,bibiFound)=>{
            if(err) return res.status(404).send({report:'Error buscando bibliografía'});

            if(bibiFound == '') res.status(500).send({report:'No existen bilbiografias'});

            return res.status(200).send(bibiFound);
        }).sort({copias:1})
    }
}

function buscarDisponibles(req,res){

    var orden = req.params.orden;
    var type = req.params.tipo;

    if(orden == 'Mayor'){
        biblioModel.find({type:type},(err,bibiFound)=>{
            if(err) return res.status(404).send({report:'Error buscando bibliografía'});

            if(bibiFound == '') res.status(500).send({report:'No existen bilbiografias'});

            return res.status(200).send(bibiFound);
        }).sort({disponibles:-1})
    }

    if(orden == 'Menor'){
        biblioModel.find({type:type},(err,bibiFound)=>{
            if(err) return res.status(404).send({report:'Error buscando bibliografía'});

            if(bibiFound == '') res.status(500).send({report:'No existen bilbiografias'});

            return res.status(200).send(bibiFound);
        }).sort({disponibles:1})
    }
}

function buscarPalabra(req,res){

    var palabra = req.params.palabra;
    var tipo = req.params.tipo;
    console.log(palabra,tipo)

    biblioModel.findOne({palabrasClave:palabra,type:tipo},(err,bibiFound)=>{

      if(err) return res.status(404).send({report:'Error buscando bibliografia'});
      
      if(!bibiFound) return res.status(404).send({report:'No existe la bibliografía'});

          biblioModel.findByIdAndUpdate(bibiFound._id, {buscados:(bibiFound.buscados + 1)},(err,bibiEdit)=>{

              if(err) return res.status(404).send({report:'Error la busqueda'});

              if(!bibiEdit) return res.status(500).send({report:'Bibliografía no editada'});

              return res.status(200).send([bibiFound]);
          })

      
  })
}

function buscarPopular(req,res){

    var typo = req.params.tipo

    biblioModel.find({type:typo},(err,biblioFound)=>{
        if(err) return res.status(404).send({report:'Error buscando bibliografía'});

        if(!biblioFound) return res.status(500).send({report:'Bibliografías no existentes'})

        return res.status(200).send(biblioFound);
    })
}

module.exports = {
    crear,
    buscarID,
    buscarTitulo,
    editarBiblio,
    eliminarBiblio,
    buscarCopias,
    buscarDisponibles,
    buscarPalabra,
    buscarPopular
}