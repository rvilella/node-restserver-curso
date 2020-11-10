require('./config/config.js');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded (middleware)
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json (middleware)
app.use(bodyParser.json())

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, './public')));
// app.use(express.static(__dirname + '/public'));

//Configuración global de rutas (middleware)
app.use(require('./routes/index.js'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto:', process.env.PORT);
});