import { Router } from 'express'
import { registrarGenero, listarGenero } from '../controllers/genderController.js'
import { verificarLogin } from '../middlewares/loginMiddle.js'

const genderRoute = Router()

genderRoute.get('', listarGenero)
genderRoute.post('', registrarGenero)

export default genderRoute