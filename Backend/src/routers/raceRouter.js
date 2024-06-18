import { Router } from 'express'
import { registrarRaza, listarRaza } from '../controllers/raceController.js'
import { verificarLogin } from '../middlewares/loginMiddle.js'

const raceRoute = Router()

raceRoute.post('', registrarRaza)
raceRoute.get('', listarRaza)

export default raceRoute