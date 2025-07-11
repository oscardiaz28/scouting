import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },

    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true
    },
    pasesCompletados: Number,
    regates: Number,
    tiros: Number,
    intercepciones: Number,
    faltasCometidas: Number,
    asistencias: Number,
    duelosGanados: Number,
    recuperaciones: Number,
    goles: Number,
    
    resistencia: Number,
    salto: Number,
    agresividad: Number,
    centros: Number,
    definicion: Number,
    control_balon: Number,
    agilidad: Number,

    radar: {
        tecnica: Number,
        fuerza: Number,
        velocidad: Number,
        regate: Number,
        visionJuego: Number
    },

    speed_max: Number,
    distancia_recorrida: Number,
    sprints: Number,
    distribucionPases: {
        cortos: Number,
        largos: Number,
        filtrados: Number,
        centros: Number
    },

    distribucionTiros: {
        dentroArea: Number,
        fueraArea: Number,
        cabeza: Number,
        pieIzquierdo: Number,
        pieDerecho: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Stat = mongoose.model("Stat", statSchema)