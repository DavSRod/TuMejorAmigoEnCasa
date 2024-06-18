import { Router } from 'express'
import { registrarCategoria, listarCategoria } from '../controllers/categoryController.js'
import { verificarLogin } from '../middlewares/loginMiddle.js'

const categoryRoute = Router()

categoryRoute.get('', listarCategoria)
categoryRoute.post('', registrarCategoria)

export default categoryRoute