import categoryModel from '../models/categoriesModel.js'

export const registrarCategoria = async (req, res) => {
    try {
        const data = req.body
        const docs = await categoryModel.create(data)
        res.send({ data: docs })
    } 
    catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const listarCategoria = async (req, res) => {
    try {
        const race = await categoryModel.find({})
        res.send(race)
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }
}