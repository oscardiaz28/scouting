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
    video_public_id: {
        type: String
    },
    observaciones: {
        type: String
    },
    fecha: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Video = mongoose.model('Video', videoSchema);