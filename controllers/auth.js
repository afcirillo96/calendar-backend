//opcional para tener la ayuda del tipeo
const { response } = require('express');
const bcryptj = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async( req, res = express.response ) => {

    const { name, email, password } = req.body;//desestructuramos el body del req que lo contiene junto con mucha otra info

    try {//validacionUsuario
        let usuario = await Usuario.findOne({email});

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        usuario = new Usuario( req.body );
        
        //Encriptar Contraseña
        const salt = bcryptj.genSaltSync();
        usuario.password = bcryptj.hashSync( password, salt);

        await usuario.save();

        //Generar nuestro JWT (Jason Web Token)
        const token = await generarJWT( usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador.'
        });
    }
}


const loginUsuario =  async( req, res = express.response ) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({email});

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        //Confirmar los passwords
        const validPassword = bcryptj.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password Incorrecto'
            });
        }

        //Generar nuestro JWT (Jason Web Token)
        const token = await generarJWT( usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador.'
        });
    }
}


const revalidarToken = async( req, res = express.response ) => {
    
    const { uid, name } = req;

    //Generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT( uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token,
    });
}


//mis exports
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}