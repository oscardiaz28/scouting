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
            values: ["delantero", "defensa", "mediocampista", "arquero"],
            message: "Posición Inválida"
        }
    },
    edad: {
        type: Number,
        required: true
    },
    partidos: {
        type: Number,
        required: false,
        default: 0
    },
    goles: {
        type: Number,
        required: false,
        default: 0
    },
    habilidad_destacada: {
        type: String,
        required: false
    },
    es_prospecto: {
        type: Boolean,
        required: false,
        default: false
    },
    pie_dominante: {
        type: String,
        required: false
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export const Player = mongoose.model('Player', playerSchema)