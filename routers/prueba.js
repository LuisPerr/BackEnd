const express = require('express');
const PruebaController = require('../controllers/prueba');
const md_auth = require('../middleware/autheticated');
const multipart = require('connect-multiparty');

const api = express.Router();
const md_upload = multipart({ uploadDir: './uploads/pruebas' })

api.post("/prueba-fun", PruebaController.pruebaFun);
api.get("/select-empreado/:idEmpleado", PruebaController.SelectEmpreado);
api.put("/upload-prueba/", [md_auth.ensureAuth, md_upload], PruebaController.uploadPrueba);
api.post("/upload-base/", [md_auth.ensureAuth], PruebaController.uploadBase64ImagePrueba);

module.exports = api;