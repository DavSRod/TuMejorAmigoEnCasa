import raceModel from '../models/racesModel.js'

export const registrarRaza = async (req, res) => {
    try {
        const data = req.body
        const docs = await raceModel.create(data)
        res.send({ data: docs })
    } 
    catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const listarRaza = async (req, res) => {
    try {
        const race = await raceModel.find({})
        res.send(race)
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }
}