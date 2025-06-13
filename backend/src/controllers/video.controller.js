import cloudinary from "../lib/cloudinary.js"
import { random, uploadToCloudinary } from "../lib/utils.js"
import { Player } from "../models/player.model.js"
import { Stat } from "../models/stat.model.js"
import { Video } from "../models/video.model.js"

export const getAll = async (req, res) => {
    try{
        const videos = await Stat.find()
        .select(["videoId", "playerId", "-_id"])
        .populate({
            path: 'videoId',
            model: 'Video',
            select: ['_id', 'nombre', 'descripcion', 'fecha', 'url_video']
        })
        .populate({
            path: 'playerId',
            model: 'Player',
            select: ["_id", "nombre", "apellido"]
        })
        .lean()
        res.json(videos)
    }catch(err){
        console.log(`Error in getAll in video controller: ${err}`)
        res.status(500).json({message: "Ha ocurrido un error, intente más tarde"})
    }
}

export const getOne = async (req, res) => {
    const {id} = req.params
    try{
        const stats = await Stat.findOne({videoId: id})
        .populate({
            path: "videoId",
            model: "Video"
        })
        .populate({
            path: "playerId",
            model: "Player",
            select: ["_id", "nombre", "apellido", "posicion"]
        }).lean()

        if(!stats) return res.status(400).json({message: "Video no encontrado"})

        res.json(stats)
    }catch(err){
        console.log(`Error in getOne in video controller: ${err}`)
        res.status(500).json({message: "Ha ocurrido un error, intente más tarde"})
    }
}


export const addVideo = async (req, res) => {
    const file = req.file
    const {playerId, nombre, descripcion, fecha} = req.body || {}
    if(!file) return res.status(400).json({message: "El video es obligatorio"})

    try{
        const {fieldname, originalname, mimetype, buffer, size} = file
        if(mimetype.startsWith("video") === false ){
            return res.status(400).json({message: "Formato no permitido"})
        }
        const player = await Player.findById(playerId)
        if(!player) return res.status(400).json({message: "El jugador no existe"})
        const {secure_url, public_id} = await uploadToCloudinary(buffer);

        const video = new Video({
            nombre,
            descripcion, 
            fecha,
            url_video: secure_url,
            video_public_id: public_id
        })

        const videoSaved = await video.save();

        const stats = new Stat({
            videoId: videoSaved._id,
            playerId: player._id,
            pasesCompletados: random(10, 30),
            regates: random(5, 20),
            tiros: random(0, 10),
            intercepciones: random(1, 10),
            faltasCometidas: random(0, 5),
            asistencias: random(0, 5),
            goles: random(0, 5),
            duelosGanados: random(3, 15),
            recuperaciones: random(3, 15),

            speed_max: random(10, 20),
            distancia_recorrida: random(30, 40),
            sprints: random(5, 15),

            radar: {
                tecnica: random(60, 100),
                resistencia: random(60, 100),
                fuerza: random(60, 100),
                pases_acertados: random(10, 20),
                visionJuego: random(10, 30)
            },
             distribucionPases: {
                cortos: random(5, 15),
                largos: random(2, 10),
                filtrados: random(1, 7),
                centros: random(0, 5)
            },
            distribucionTiros: {
                dentroArea: random(0, 5),
                fueraArea: random(0, 5),
                cabeza: random(0, 3),
                pieIzquierdo: random(0, 5),
                pieDerecho: random(0, 5)
            },
        })

        await stats.save()
        player.goles = player.goles + stats.goles
        await player.save()
        res.json(videoSaved)

    }catch(err){
        console.log(`Error in addVideo in video controller: ${err.message}`)
        res.status(500).json({message: "Ha ocurrido un error, intente más tarde"})
    }
}

export const searchVideos = async (req, res) => {
    const query = req.query.query || ""
    try{
        const videos = await Video.find({
            $or: [
                {nombre: {$regex: query, $options: 'i'}},
                {descripcion: {$regex: query, $options: 'i'}}
            ]
        })
        res.json(videos)
    }catch(err){
        console.log(`Error in searchVideos controller: ${err.message}`)
        res.status(500).json({message: "No se ha podido realizar la busqueda"})
    }
}