import { Router } from 'express'
import { registrarMascota, listarMascota, actualizarMascota, eliminarMascota, listarMascotaPorId } from '../controllers/petController.js'
import { verificarLogin } from '../middlewares/loginMiddle.js'
import { cargarImagen } from '../config/Image.js'

const petRoute = Router()

petRoute.get('', verificarLogin, listarMascota)
petRoute.post('', verificarLogin, cargarImagen, registrarMascota)
petRoute.put('/:id', verificarLogin, cargarImagen, actualizarMascota)
petRoute.delete('/:id', verificarLogin, eliminarMascota)
petRoute.get('/:id', verificarLogin, listarMascotaPorId)

export default petRoute