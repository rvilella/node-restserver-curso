const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario.js');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

//cargar express
const app = express();


// app.get('/', function(req, res) {
//     // res.send('Hello World');
//     res.json('Hello World');
// });

app.get('/usuario', verificaToken, (req, res) => {
    // res.json('get Usuario');

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //{} va condición, ejemplo: google: true
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, count) => {
                res.json({
                    ok: true,
                    usuarios,
                    count
                });
            })

        })

});

app.post('/usuario', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        //para no mostrar el password encriptado, pero se muestra el nombre del campo
        // usuarioDB.password = null

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

    // if (body.nombre === undefined) {

    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     });

    // } else {
    //     res.json({
    //         persona: body
    //     });
    // }

});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    //filtra por propiedades validas
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // sentencias para no poder modificar esos valores (obsoleta)
    // delete body.password;
    // delete body.google;

    // new: devuelve el usuario actualizado
    // runValidators: ejecuta todas las validaciones definidas en el esquema
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })


});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    })

});

module.exports = app;