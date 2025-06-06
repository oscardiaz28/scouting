import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const checkAuth = async (req, res, next) => {
    const token = req.cookies.jwt
    if(token === undefined || token === ""){
        return res.status(400).json({message: "No has iniciado sesion"})
    }
    try{
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(id).select("-password")
        if(!user) return res.status(400).json({message: "Usuario no existe"})
        req.user = user
        next()
    }catch(err){
        res.status(400).json({message: "Token invalido"})
    }
}