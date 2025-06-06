import mongoose from "mongoose"

const playerSchema = new mongoose.Schema({
    dni: {
        type: String,
        required: [true, "El DNI es obligatorio"],
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        default: "default-profile.jpg"
    },
    posicion: {
        type: String,
        required: true,
        enum: {
            values: ["Delantero", "Defensa", "Mediocampista", "Arquero"],
            message: "Posición Inválida"
        }
    },
    edad: {
        type: String,
        required: true
    },
    partidos: {
        type: Number,
        required: false
    },
    goles: {
        type: Number,
        required: false
    },
    habilidad_destacada: {
        type: String,
        required: false
    },
    es_prospecto: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true })

export const Player = mongoose.model('Player', playerSchema)