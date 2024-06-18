import { Router } from 'express'
import { registrarUsuario } from '../controllers/userController.js'
import { verificarLogin } from '../middlewares/loginMiddle.js'

const userRoute = Router()

userRoute.post('', registrarUsuario)

export default userRoute