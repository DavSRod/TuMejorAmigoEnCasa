import userModel from '../models/usersModel.js'
import { encriptarPassword } from '../models/usersModel.js'

export const registrarUsuario = async (req, res) => {
    try {
        const {fullname, email, password} = req.body
        const contraseniaCrypted = await encriptarPassword(password)

        console.log(contraseniaCrypted)

        const user = new userModel({
            fullname,
            email,
            password: contraseniaCrypted
        })

        const save = await user.save()

        return res.status(201).json({mensaje : "usuario creado" })
    } 
    catch (error) {
        res.status(500).send({ error: error.message })
    }
}