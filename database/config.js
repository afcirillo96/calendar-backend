const mongoose = require('mongoose');

//necesito ejecutar esto en mi index...
const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('db_online')

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar DB');
    }
}

module.exports = {
    dbConnection
}