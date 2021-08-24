'use strict'

const app = require('./app');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const userModel = require('./src/models/user.model');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/LibreriaDigital', {useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{

    var usuario = 'adminpractica';
    var password = 'adminpractica';
    var rol = 'admin';
    var UserModel = new userModel();

    UserModel.usuario = usuario;
    UserModel.rol = rol;

    userModel.find({ usuario : usuario }).exec((err,userFound)=>{
        if(userFound && userFound.length >= 1) return console.log("User exist");

        bcrypt.hash(password, null, null, (err, encryptedPasswords)=>{
            if(err) return console.log("password request error");

            UserModel.password = encryptedPasswords;

            UserModel.save((err,userSave)=>{
                if(err) return console.log("save user request error");

                if(userSave){
                    return console.log(userSave);
                }else{
                    return console.log("not save the user")
                }
            })
        })
    })

    app.listen(3000, function(){
    })

}).catch(err => console.log(err))