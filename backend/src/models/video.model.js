import mongoose from "mongoose"
import { type } from "node:os";

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
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    is_analyzed: {
        type: String
    },
    duration: {
        type: Number
    },
    size_bytes: {
        type: Number
    }
})

videoSchema.virtual('stats', {
  ref: 'Stat',             // modelo relacionado
  localField: '_id',       // campo local en Video
  foreignField: 'videoId'  // campo en Stat que apunta a Video
});

videoSchema.set('toObject', { virtuals: true });
videoSchema.set('toJSON', { virtuals: true });


export const Video = mongoose.model('Video', videoSchema);