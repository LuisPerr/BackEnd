const app = require('./app');
require('colors');

const { API_VERSION, IP_SERVER, port } = require('./config');

app.listen(port, () => {
    console.log('############################'.green);
    console.log('#########'.green + ' API REST '.yellow + '#########'.green)
    console.log('############################'.green);
    console.log('Listo para usar en: '.yellow + `http://${IP_SERVER}:${port}/api/${API_VERSION}`.underline.red);
});