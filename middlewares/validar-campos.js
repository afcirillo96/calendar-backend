//Realizanmos las imports
const { response } = require('express');
const { validationResult } = require('express-validator');//validator

//Creamos la funcion con el codigo que queremos optimizar y q se usara al final del ultimo check de cada ruta
const validarCampos = ( req, res = response, next ) => {//si todo el middleware se ejecuta bien, se llama al next
    
    //manejo de errores
    const errors = validationResult( req );//trae el request
    if ( !errors.isEmpty() ) {  //si encuentra errores...
        return res.status(400).json({   //tire el status http error 400 y los datos del json a continuacion...
            ok: false,
            errors: errors.mapped()
        });
    }

    next();//si todo el middleware se ejecuta bien, se llama al next
}


//Lo exportamos
module.exports = {
    validarCampos
}