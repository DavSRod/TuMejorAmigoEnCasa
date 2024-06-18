import mongoose from 'mongoose'
import bycrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        maxlength: 32,
        required: true
    },
    email: {
        type: String,
        maxlength: 32,
        required: true,
        unique: true
    },
    password: {
        type: String,
        maxlength:64,
        required: true
    }
})

const userModel = mongoose.model('users', userSchema)

export default userModel

export const encriptarPassword = async (password) => {
    const passwordEncriptada = await bycrypt.hash(password, 10)
        return passwordEncriptada
}

export const compararPassword = async (texto, passwordEncripta) => {
    return await bycrypt.compararPassword(texto, passwordEncripta)
}