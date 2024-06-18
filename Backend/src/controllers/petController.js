import petModel from '../models/petsModel.js'

export const registrarMascota = async (req, res) => {
    try {
        const { name, race_id, category_id, gender_id } = req.body
        const img = req.file.originalname

        const newMascota = new petModel({
            name,
            race_id,
            category_id,
            gender_id,
            photo: img
        })
        const save = await newMascota.save()

        return res.status(200).json(save)

    } catch (error) {
        return res.status(500).json({ mensaje: "error en el servidor" + error })
    }
}

export const listarMascota = async (req, res) => {
    try {
        const race = await petModel.find({}, "name race_id photo")
        .populate("race_id", "name _id")
        .exec()

        if(race.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron mascotas" })
        }

        return res.status(200).json(race)
    }
    catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor: " + error })
    }
}

/* export const listarMascotaPorId = async (req, res) => {
    try {
        const id = req.params.id
        const pets = await petModel.findById(id, 'name race_id photo')
            .populate('race_id', 'name')
            .populate('category_id', 'name')
            .populate('gender_id', 'name')
            .exec();

        if (pets.length === 0) return res.status(404).json({ mensaje: "No se encontraron mascotas" })

        const pet = {
            id: pets._id,
            nombre: pets.name,
            raza: pets.race_id.name,
            categoria: pets.category_id.name,
            genero: pets.gender_id.name,
            foto: pets.photo
        }

        return res.status(200).json({ pet: pet })
    } catch (error) {
        return res.status(500).json({ mensaje: "Error: " + error })
    }
} */

    export const listarMascotaPorId = async (req, res) => {
        try {
            const idMascota = req.params.id
    
            const mascotas = await petModel.findById(idMascota, 'name race_id photo')
                .populate('race_id', 'name')
                .populate('category_id', 'name')
                .populate('gender_id', 'name')
                .exec();
    
            if (mascotas.length === 0) return res.status(404).json({ mensaje: "no encontraron mascotas" })
    
            const mascota = {
                id: mascotas._id,
                nombre: mascotas.name,
                raza: mascotas.race_id.name,
                categoria: mascotas.category_id.name,
                genero: mascotas.gender_id.name,
                foto: mascotas.photo
            }
    
            return res.status(200).json({ mascota: mascota })
        } catch (error) {
            return res.status(500).json({ mensaje: "error en el servidor" + error })
        }
    }

export const eliminarMascota = async (req, res) => {
    try {
        const id = req.params.id
        const response = await petModel.deleteOne({ _id: id })

        if (response.deletedCount === 0) return res.status(404).json({ mensaje: "No se encontro mascota para eliminar" })

        res.status(200).json({ mensaje: "mascota eliminada" })

    } catch (error) {
        return res.status(500).json({ mensaje: "error en el servidor" + error })
    }
}

/* export const actualizarMascota = async (req, res) => {
    try {
        console.log(req.body)
        const { nombre, raza, categoria, genero } = req.body
        const id = req.params.id

        console.log(nombre, raza, categoria, genero)

        const response = await petModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    name: nombre,
                    race_id: raza,
                    category_id: categoria,
                    gender_id: genero
                }
            },
            { new: true }
        )

        if (response) return res.status(200).json({ mensaje: "mascota actualizada" })

    } catch (error) {
        return res.status(500).json({ mensaje: "error en el servidor" + error })
    }
} */

    export const actualizarMascota = async (req, res) => {
        try {
            const { id } = req.params
            const { nombre, categoria, genero, raza } = req.body
    
            let imagen = ''
            if (req.file) {
                imagen = req.file.filename
            }
    
            const updatedFields = {}
            if (nombre) updatedFields.name = nombre
            if (categoria) updatedFields.category_id = categoria
            if (genero) updatedFields.gender_id = genero
            if (raza) updatedFields.race_id = raza
            if (imagen) updatedFields.photo = imagen
    
            const result = await petModel.findByIdAndUpdate(id, { $set: updatedFields }, { new: true })
    
            if (result) {
                res.status(200).json({ message: 'Mascota actualizada con éxito', data: result })
            } else {
                res.status(404).json({ message: 'Mascota no encontrada' })
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la mascota: ' + error.message })
        }
    }