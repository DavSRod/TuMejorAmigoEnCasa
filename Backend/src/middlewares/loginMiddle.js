import jwt from "jsonwebtoken"

export const verificarLogin = (req, res, next) => {

    const header = req.header('token') || ""
    const token = header.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "No se ingresaron las credenciales" })
    }

    try {
        const checkPassword = jwt.verify(token, process.env.AUTH_SECRET)
        req.user = checkPassword.user
        next()

    } catch (error) {
        return res.status(403).json({ message: "Token no valido" })
    }
}