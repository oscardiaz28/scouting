import mongoose from "mongoose";

const statSchema = new mongoose.Schema({    
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    pasesCompletados: Number,
    regates: Number,
    tiros: Number,
    intercepciones: Number,
    faltasCometidas: Number,
    radar: {
        tecnica: Number,
        resistencia: Number,
        fuerza: Number,
        decisiones: Number,
        visionJuego: Number
    },
    speed_max: Number,
    distancia_recorrida: Number,
    sprints: Number
    // zona_iniciacion: Number,
    // zona_defensiva: Number,
    // zona_creacion: Number,
    // zona_ataque: Number,
    // zona_finalizacion: Number
})

export const Stat = mongoose.model("Stat", statSchema)