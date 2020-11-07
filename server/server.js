require('./config/config.js');

const express = require('express');

const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded (middleware)
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json (middleware)
app.use(bodyParser.json())

//Configuración global de rutas (middleware)
app.use(require('./routes/index.js'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto:', process.env.PORT);
});