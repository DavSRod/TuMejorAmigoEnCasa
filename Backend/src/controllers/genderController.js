import genderModel from '../models/gendersModel.js'

export const registrarGenero = async (req, res) => {
    try {
        const data = req.body
        const docs = await genderModel.create(data)
        res.send({ data: docs })
    } 
    catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const listarGenero = async (req, res) => {
    try {
        const race = await genderModel.find({})
        res.status(200).json(race)
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }
}