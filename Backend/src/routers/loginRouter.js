import { Router } from "express"
import Login from "../controllers/loginController.js"

const loginRoute = Router()

loginRoute.post('/login', Login)

export default loginRoute