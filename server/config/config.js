// Puerto en heroku
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Vencimiento del token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//                            seg  min  h    d

// SEED de autenticación
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//Base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //urlDB = 'mongodb+srv://admin:ID2H50AQazUqMHaW@cluster0.gjbdq.mongodb.net/cafe';
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;