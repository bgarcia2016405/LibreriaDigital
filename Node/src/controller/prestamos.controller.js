'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const prestaModel = require("../models/prestamos.model");
const biblioModel = require("../models/bibliografia.model");
const userModel = require("../models/user.model");
const { find } = require('../models/bibliografia.model');

const presta = 'prestado';
const devuelto = 'devuelto';

function prestamo(req,res){
    var libro = req.params.libro;
    var user = req.user.sub;
    var PrestaModel = prestaModel();

    PrestaModel.bibliografia = libro;
    PrestaModel.user = user;
    PrestaModel.estado = presta;

    biblioModel.findById(libro, (err,biblioFound)=>{  
        if(err) return res.status(404).send({report:'Error buscando bibliografía'});

        if(!biblioFound) return res.status(500).send({report:'No existe la bibliografía'});

        if(biblioFound.disponibles == 0) return res.status(500).send({report:'No existen copias dispnibles en este momento'})

        PrestaModel.titulo = biblioFound.titulo;
        
                prestaModel.find({$and:[{user:user}, {bibliografia:biblioFound._id}, {estado:presta}]}, (err,libroPrestado)=>{

                    if(err) return res.status(404).send({report:'Error buscando '});

                    if(libroPrestado != "") return res.status(404).send({report:'libro en posesión'})

                    prestaModel.find({$and:[{user:user}, {estado:presta}]}, (err,prestaFound)=>{

                        if(err) return res.status(404).send({report:'Error buscando historial'});

                        if(prestaFound.length == 10) return res.status(200).send({report:'Llego a su limite de prestamos'})

                            PrestaModel.save((err,prestaSaved)=>{

                                if(err) return res.status(404).send({report:'Error prestando bibliografía'});

                                if(!prestaSaved) return res.status(500).send({report:'No se presto la bibliografía'});

                                    biblioModel.findByIdAndUpdate(libro,{disponibles:(biblioFound.disponibles-1),
                                                                                        prestados:(biblioFound.prestados+1)},
                                                (err,bibiEdited)=>{  
                                                    if(err) return res.status(404).send({report:'Error editando bibliografía'});

                                                    if(!bibiEdited) return res.status(500).send({report:'Bibliografía no editada'});
                                                
                                                    return res.status(200).send(prestaSaved);
                                                })
                                
                            })

                    })
                })

                    

           
      })

}

function devolver(req,res){
    var prestamo = req.params.prestamo;

    prestaModel.findByIdAndUpdate(prestamo,{estado:devuelto},(err,prestamoFound)=>{
        if(err) return res.status(404).send({report:'Error buscando el prestamo de libro'});

        if(!prestamoFound) return res.status(500).send({report:'No existe este prestamo'})

            biblioModel.findById(prestamoFound.bibliografia, (err,biblioFound)=>{
                
                if(err) return res.status(404).send({report:'Error buscando bibliografía'});

                if(!biblioFound) return res.status(500).send({report:'No se encontro bibliografía'});

                    biblioModel.findByIdAndUpdate(prestamoFound.bibliografia,{disponibles:(biblioFound.disponibles+1)},(err,biblioEdited)=>{

                        if(err) return res.status(404).send({report:'Error editando biblilografía'})

                        if(!biblioEdited) return res.status(500).send({report:'Bibliografía no editada'})

                        return res.status(200).send(biblioEdited);
                    })
                
            })
        
        
    })
}

function historial(req,res){
    var usuario = req.params.idUser;

    prestaModel.find({estado:"devuelto"},(err,history)=>{
        if(err) return res.status(404).send({report:'Error buscando historial'})

        if(history == "") return res.status(404).send({report:'historial no encontrado'})

        return res.status(200).send(history);
    }).populate("bibliografia user")
}

function posesion(req,res){
    var usuario = req.params.idUser;

    prestaModel.find({ estado:"prestado"}, (err,poseido)=>{
        if(err) return res.status(404).send({report:'Error buscando historial'})

        if(poseido == "") return res.status(404).send({report:'Sin bibliografía en posesión'})

        return res.status(200).send(poseido);
    }).populate("bibliografia user")
}

module.exports = {
    prestamo,
    devolver,
    historial,
    posesion
}