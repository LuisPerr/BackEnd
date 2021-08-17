# BackEnd
Proyecto de BackEnd creado con NodeJs, contiene:
1.- Manejador de rutas y peticiones HTTP express.
2.- Conexión a sql server con mssql.
3.- Creación y validación de token con jwt.
4.- Monitor de cambios en el servidor nodemon.
El proyecto esta creado con el manejador de packetes YARN, el script de iniciacion es "yarn start", en el archivo config.js contiene las variables para el servidor, coneccion base de datos y el secret key para encriptar y desencriptar el token.
Para poder ejecutar un SP en el server se debera crerar una de la conexion a la BD y llamar la funcion query, esta funcion recibe 2 parametros y tiene una funcion callback
Ejemplo:
instancia.query('STORE', parametros (Arreglo), (error, result) => {});
Ejemplo parametros:
const params = [
  { name: 'nombreDelParametro', value: ValorDel parametro, type: model.types.INT (Tipo de dato)}
];
En el proyecto existe un controller llamado prueba ahi viene ejemplos para ejecutar un SP sin parametros, ejecutar un SP con parametros, guardar una imagen con el middleware connect-multiparty y uno mas para guardar una imagen en base64.
