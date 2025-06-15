import { generateToken, hashPassword, sendCookie } from "../lib/utils.js"
import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'


export const signup = async (req, res) => {
    const {username, email, password} = req.body || {}
    try{
        const existsUsername = await User.findOne({username})
        if(existsUsername) return res.status(400).json({message: "El username ya existe"})

        const existsEmail = await User.findOne({email})
        if(existsEmail) return res.status(400).json({message: "El email ya existe"})

        const hashedPass = await hashPassword(password)
        const user = new User({
            username, email, password: hashedPass
        })
        await user.save()
        res.json({message: "Usuario creado exitosamente"})

    }catch(err){
        console.log(`Error in signup controller: ${err.message}`)
        res.status(500).json({message: "No se ha podido crear su cuenta, intente más tarde"})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body || {}
    try{
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "Credenciales Inválidas"})
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Credenciales Inválidas"})

        const token = generateToken(user._id)   
        sendCookie({
            name: "jwt",
            payload: token,
            res: res
        })
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }catch(err){
        console.log(`Error in login controller: ${err.message}`)
        res.status(500).json({message: "Ha ocurrido un error, intenta más tarde"})
    }
}



export const logout = (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Cierre de sesión exitoso"})
    }catch(err){
        console.log(`Error in login controller: ${err.message}`)
        res.status(500).json({message: "Ha ocurrido un error, intenta más tarde"})
    }
}

export const verify = (req, res) => {
    const {user} = req
    res.status(200).json(user)
}