const express = require('express');

const app = express();
const { API_VERSION } = require('./config');

//Carga de rutas
const authRoutes = require('./routers/auth');
const pruebaRoutes = require('./routers/prueba');

app.use(express.urlencoded({ limit: '250mb', extended: true }))
app.use(express.json({ limit: '250mb' }));
app.use(express({ limit: '250mb' }));

// configuracion del header de HTTP;
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
});

//Rutas basicas
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, pruebaRoutes);

module.exports = app;