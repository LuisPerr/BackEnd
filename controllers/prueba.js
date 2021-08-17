const Sql = require('../database/connection');
const model = new Sql();
const jwt = require('../services/jwt');
const saveImagesB64 = require('../utils/saveImages');

function pruebaFun(req, res) {
    const params = [];

    model.query('[dbo].[SEL_EMPRESA]', params, (error, result) => {
        res.status(200).send({ success: 1, message: 'Empresas encontradas', data: result });
    });
};

function SelectEmpreado(req, res) {
    const { usuario } = req.params;

    const params = [
        { name: 'usuario', value: usuario, type: model.types.INT }
    ];

    model.query('[dbo].[logea_usuario]', params, (error, result) => {
        if (error) {
            return res.status(400).send({ success: 0, message: error });
        } else {
            if (!result) {
                return res.status(404).send({ success: 0, message: 'No se encontro usuario' });
            } else {
                const tokens = {
                    accessToken: jwt.createAccessToken(result[0]),
                    refreshToken: jwt.createRefreshToken({ idUsuario: result[0].idUsuario })
                };
                return res.status(200).send({ success: 1, message: 'Usuario encontrado', data: tokens });
            };
        };
    });
};

function uploadPrueba(req, res) {
    res.status(200).send({ success: 1, message: 'Se cargo la imagen', data: { url: req.files.image.path } });
};

async function uploadBase64ImagePrueba(req, res) {
    const { nombreImage, base64, saveUrl } = req.body;
    const url = `${saveUrl}${nombreImage}`;

    const resSave = await saveImagesB64.saveImage(base64.split(';base64,').pop(), url);

    if (resSave.success) {
        res.status(200).send({ success: 1, message: resSave.msg });
    } else {
        res.status(500).send({ success: 0, message: resSave.msg });
    };
};

module.exports = {
    pruebaFun,
    SelectEmpreado,
    uploadPrueba,
    uploadBase64ImagePrueba
};