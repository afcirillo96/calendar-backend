/*
    Rutas de Usarios / Auth
    host + /api/auth
*/
//importaciones
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');//import de controllers/auth
const { validarCampos } = require('../middlewares/validar-campos');//importamos el custom middleware
const { validarJWT } = require('../middlewares/validar-jwt');

//rutas
router.post(
    '/new',
    [   //middlewares y validaciones
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6}),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [   //middlewares y validaciones
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6}),
        validarCampos       
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;//exportacion de las rutas (en node)