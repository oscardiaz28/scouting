import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { Readable } from 'node:stream'
import cloudinary from './cloudinary.js'

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const generateToken = (userId) => {
    const payload = {
        id: userId
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    return token
}

export const sendCookie = ({name, payload, res}) => {
    res.cookie(name, payload, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
    return true
}


export const validateObjectId = (req, res, next) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "El id es inválido"})
    }
    next()
}


export const bufferToStream = (buffer) => {
    const readable = new Readable() //clase que permite leer datos en forma de flujo (stream)
    readable.push(buffer)
    readable.push(null) //fin del stream
    return readable
}

export const uploadToCloudinary = (fileBuffer) => {
    return new Promise( (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {folder: 'videos'},
            (error, result) => {
                if(error) return reject(error)
                resolve(result.secure_url)
            }
        );
        /**
         * pipe() conecta dos streams
         * toma lo que emite el primer stream, convertido desde el buffer y el segundo es 
         * uploadStream que recibe los datos para subirlo
         */
        bufferToStream(fileBuffer).pipe(uploadStream) 
    })
}