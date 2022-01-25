const { response, request } = require('express');
const Evento = require('../models/Evento');

const getEventos = async( req, res = response ) => {

    const eventos = await Evento.find().populate('user', 'name');//populate para ademas mostrar el name de quien lo subió

    res.status(201).json({
        ok: true,
        eventos
    });
}


const crearEvento = async( req, res = response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;//user proviene de Evento.js

        const eventoGuardado = await evento.save(); 

        res.json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Admin'
        });
    }
}


const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;//lo hacemos a partir del id del evento
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId ); //Verifico si el evento existe
        
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {//si id es diferente, sig q una persona quiere editar un evento de otra persona
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar ese evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true} );

        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Admin'
        });
    }
}


const eliminarEvento = async( req, res = response ) => {
    const eventoId = req.params.id;//lo hacemos a partir del id del evento
    const uid = req.uid;//id del usuario

    try {

        const evento = await Evento.findById( eventoId ); //Verifico si el evento existe
        
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {//si id es diferente, sig q una persona quiere editar un evento de otra persona
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar ese evento'
            });
        }

        const eventoEliminado = await Evento.findByIdAndRemove( eventoId );

        res.json({
            ok: true,
            evento: eventoEliminado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Admin'
        });
    }
}


module.exports = {
    getEventos,
    actualizarEvento,
    crearEvento,
    eliminarEvento
}


