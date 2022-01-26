const { Schema, model } = require('mongoose');

//Estructura del usuario
const EventoSchema = Schema({
    //esto es lo que espera el calendario que creamos antes
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

//Sobreescribir json para que _id sea id
EventoSchema.method('toJSON', function() {
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


//lo exportamos
module.exports = model('Evento', EventoSchema);