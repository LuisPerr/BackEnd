const API_VERSION = "V1";
const IP_SERVER = 'localhost';
const port = process.env.port || 1200;

/*
    user: Usuario de credenciales del servidor SQL.
    password: Contraseña de las credenciales del servidor SQL.
    sever: Servidor al que nos conectaremos.
    database: Base de datos en donde se trabajara en SQL.
*/
const dbConnection = {
    user: '',
    password: '',
    server: '',
    database: '',
    connectionTimeout: 60000
};

/**
 *  Clave secreata para encriptar y desencriptar el tojen de JWT. 
*/
const confJwt = {
    SECRET_KEY: ''
};

module.exports = {
    API_VERSION,
    IP_SERVER,
    port,
    dbConnection,
    confJwt
};