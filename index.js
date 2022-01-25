const express = require('express');//import del express
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app = express();

//Base de Datos
dbConnection();

//CORS
app.use(cors())

//Directorio Publico
//un "use,listen,etc" en Express es un middleware, una funcion que se ejecuta en el momento que alguien hace una peticion a mi servidor. Se ejecuta siempre que pase por algun lugar.
app.use( express.static('public') );

//Lectura y Parseo del Body
app.use( express.json() );

//Rutas
//auth //crear, login, renew
app.use('/api/auth', require('./routes/auth'));
//CRUD: Eventos
app.use('/api/events', require('./routes/events'));

//Escuchar peticiones
app.listen( process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${4000}`);
});