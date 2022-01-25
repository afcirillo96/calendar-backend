const { Schema, model } = require('mongoose');

//Estructura del usuario
const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

//lo exportamos
module.exports = model('Usuario', UsuarioSchema);