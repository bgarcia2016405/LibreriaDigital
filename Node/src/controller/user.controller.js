'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const userModel = require("../models/user.model");
const { findById } = require('../models/user.model');

const estudiante = 'estudiante'
const bibliotecario = 'bibliotecario';
const admin = 'admin';

function Login(req,res){
    var params = req.body;

    userModel.findOne({$or:
                        [{IDUser:params.usuario},
                        {usuario:params.usuario}]},
    (err,userFound)=>{

        if (err) return res.status(404).send({ report: 'Error at Login' });

        if (!userFound) return res.status(404).send({ report: 'user dosent exist' });

        bcrypt.compare(params.password, userFound.password, (err, Valid) => {

            if (err) return res.status(404).send({ report: 'Error in password' });
    
            if (Valid) {
    
              return res.status(200).send({ token: jwt.createToken(userFound), userFound });
    
            } else {
    
              return res.status(404).send({ report: 'The user its not valid' })
    
            }
          })
    
    })
}

function createUser(req,res){
    var params = req.body;
    var UserModel = new userModel();

    UserModel.IDUser = params.IDUser;
    UserModel.nombres = params.nombres;
    UserModel.apellidos = params.apellidos;
    UserModel.usuario = params.usuario;
    UserModel.eMail = params.eMail;
    UserModel.rol = params.rol;
    UserModel.password = params.password;

    if(UserModel.nombres == "" || UserModel.IDUser == "" || UserModel.apellidos == "" || UserModel.usuario == "" ||
         UserModel.eMail == "" || UserModel.password == ""){
        return res.status(404).send({report:'Llene todos los espacios'});
    }

    userModel.findOne({$or:
                        [{IDUser:UserModel.IDUser},
                        {usuario:UserModel.usuario}]}, (err,userFound)=>{
        if(err) return res.status(404).send({report:'Error buscando usuario'});

        if(userFound) return res.status(404).send({report:'El CUI o Usuario son existentes'});

        bcrypt.hash(params.password, null, null, (err, passewodEncriptada) => {
            if (err) return console.log("password request error");

            UserModel.password = passewodEncriptada

                UserModel.save((err, userSaved)=>{
                    if (err) return res.status(404).send({ report: 'Erro in save User' });
                    return res.status(200).send(userSaved)
                })
            })
    })
}

function eliminarUsuario(req,res){
    var authorization = req.user.rol;
    var idUser = req.params.idUser;

    if(authorization != admin) return res.status(404).send({report:'No es administrador'});

    userModel.findByIdAndDelete(idUser,(err,userDeleted)=>{

        if(err) return res.status(404).send({report:'Error eliminando usuario'});

        if(!userDeleted) return res.status(500).send({report:'No se elimino el usuario'});

        return res.status(200).send(userDeleted);
    })
}

function editarUsurio(req,res){
    var authorization = req.user.rol;
    var params = req.body;
    var idUser = req.params.idUser;

    if(authorization != admin) return res.status(404).send({report:'No es administrador'});

    userModel.findByIdAndUpdate(idUser,params,{new:true},(err,userEdit)=>{

        if(err) return res.status(404).send({report:'Error editando usuario'})

        if(!userEdit) return res.status(500).send({report:'No se edito el usuario'});

        return res.status(200).send(userEdit);
    })
}

function usuarioId(req,res){
    var authorization = req.user.rol;
    var idUser = req.params.idUser;

    if(authorization != admin) return res.status(404).send({report:'No es administrador'});

    userModel.findById(idUser, (err,UserFound)=>{

        if (err) return res.status(404).send({ report: 'Error at Login' });

        if (!UserFound) return res.status(404).send({ report: 'user dosent exist' });

        return res.status(200).send(UserFound)

    })
}

function usuarioTipo(req,res){
    var authorization = req.user.rol;
    var typo = req.params.typo;

    if(authorization != admin) return res.status(404).send({report:'No es administrador'});

    userModel.find({rol:typo}, (err,userFound)=>{
        if (err) return res.status(404).send({ report: 'Error at Login' });

        if (!userFound) return res.status(404).send({ report: 'user dosent exist' });

        return res.status(200).send(userFound);
    })
}

function listarUsuario(req,res){
    var authorization = req.user.rol;

    if(authorization != admin) return res.status(404).send({report:'No es administrador'});

    userModel.find((err,userFound)=>{
        if (err) return res.status(404).send({ report: 'Error at Login' });

        if (!userFound) return res.status(404).send({ report: 'user dosent exist' });

        return res.status(200).send(userFound);
    })
}



function buscarXId(req,res){
    var orden = req.params.orden;
    var i

    if(orden == 'Mayor') i=1
    if(orden == 'Menor') i=-1

        userModel.find((err,userFound)=>{
            if(err) return res.status(404).send({report: 'Error buscando los Usuarios'});

            if(userFound == '') return res.status(404).send({report: 'no existen los usuarios'});

            return res.status(200).send(userFound);
        }).sort({IDUser:i})
}

module.exports = {
    Login,
    createUser,
    eliminarUsuario,
    editarUsurio,
    usuarioId,
    usuarioTipo,
    listarUsuario,
    buscarXId
}