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

    radar: {
        tecnica: Number,
        resistencia: Number,
        fuerza: Number,
        decisiones: Number,
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
})

export const Stat = mongoose.model("Stat", statSchema)