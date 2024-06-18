import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        required: true,
        unique: true
    }
})

const categoryModel = mongoose.model('categories', categorySchema)

export default categoryModel