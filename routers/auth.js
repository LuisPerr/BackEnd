const express = require('express');
const AuthController = require('../controllers/auth');
const md_auth = require('../middleware/autheticated');

const api = express.Router();

api.post('/refresh-access-token', AuthController.refreshAccessToken);
api.post("/decode-token/", [md_auth.ensureAuth], AuthController.DecodeToken);

module.exports = api