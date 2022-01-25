/*
    Events Routes
    /api/events

*/
const { Router } = require("express");
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//Todas tienen que pasar por la validacion del JWT
router.use( validarJWT );//hace q todo lo de abajo tenga q estar validado con validarJWT
//todas ahora estan protegidas por JWT

//ENDPOINTS rutas
router.get('/', getEventos)

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ], 
    crearEvento)

//Actualizar evento
router.put('/:id', actualizarEvento)

//Borrar Evento
router.delete('/:id', eliminarEvento)


module.exports = router;


