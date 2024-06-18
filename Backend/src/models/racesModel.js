import mongoose from 'mongoose'

const raceSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        required: true,
        unique: true
    }
})

const raceModel = mongoose.model('races', raceSchema)

export default raceModel