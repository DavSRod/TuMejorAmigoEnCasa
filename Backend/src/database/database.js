import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config({ path: 'env/.env' })

class Conexion {
    constructor() {
        this._conecct()
    }

    _conecct() {
        mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`)
            .then(() => {
                console.log('conectado a la base de datos de las mascotas')
            }).catch(err => {
                console.error('Database connection error')
            })
    }
}

export default Conexion