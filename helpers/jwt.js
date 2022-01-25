const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name) => {

    return new Promise( (resolve, reject) => {//nueva promesa

        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {//firma del token con nuestra variable de entorno
            expiresIn: '20h'//especifico la duracion
        }, (err, token) => {//luego llama este callback

            if (err){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );//resuelve el token
        })
    })

}

module.exports = {
    generarJWT
}