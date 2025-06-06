import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    url_video: {
        type: String,
        required: true
    },
    observaciones: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true
    }
})

export const Video = mongoose.model('Video', videoSchema);