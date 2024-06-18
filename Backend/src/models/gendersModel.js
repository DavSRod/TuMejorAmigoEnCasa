import mongoose from 'mongoose'

const genderSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        required: true,
        unique: true
    }
})

const genderModel = mongoose.model('genders', genderSchema)

export default genderModel