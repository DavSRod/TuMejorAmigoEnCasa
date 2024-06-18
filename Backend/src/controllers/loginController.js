import jwt from 'jsonwebtoken'
import userModel from '../models/usersModel.js'
import { compare } from '../config/bycrypt.js'

const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        const userLogin = await userModel.find({
            email: email
        })
        if (userLogin.length === 0) return res.status(400).json({ "mensaje": "Correo incorrecto" })
        let user = userLogin[0]

        const checkPassword = await compare(password, user.password)

        if (checkPassword) {
            const token = jwt.sign({ usuario: user }, process.env.AUTH_SECRET, { expiresIn: process.env.TIME })

            return res.status(200).json({
                "Mensaje": "Usuario autorizado",
                token: token
            })
        }
        return res.status(400).json({ mensaje: "Contraseña incorrecta" })

    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor: " + error })
    }
}

export default Login