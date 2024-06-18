import express from 'express'
import bodyParser from 'body-parser'
import Conexion from './src/database/database.js'
import userRoute from './src/routers/userRouter.js'
import raceRoute from './src/routers/raceRouter.js'
import categoryRoute from './src/routers/categoryRouter.js'
import genderRoute from './src/routers/genderRouter.js'
import petRoute from './src/routers/petRouter.js'
import loginRoute from './src/routers/loginRouter.js'
import cors from 'cors'

const servidor = express()
servidor.use(express.json())

const port = 3000

servidor.use(cors())

new Conexion()

servidor.use(bodyParser.json())
servidor.use(bodyParser.urlencoded({ extended: true }))

servidor.set('view engine', 'ejs')
servidor.set('views', './views')

servidor.use(express.static('./public'))
servidor.use('/user', userRoute)
servidor.use('/raza', raceRoute)
servidor.use('/categoria', categoryRoute)
servidor.use('/genero', genderRoute)
servidor.use('/mascota', petRoute)
servidor.use(loginRoute)

servidor.use('/documents', (req, res) => {
    res.render('documentacion.ejs')
})

servidor.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})