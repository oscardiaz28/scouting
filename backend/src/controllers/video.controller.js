import cloudinary from "../lib/cloudinary.js"
import { random, randomSkill, uploadToCloudinary } from "../lib/utils.js"
import { Player } from "../models/player.model.js"
import { Stat } from "../models/stat.model.js"
import { Video } from "../models/video.model.js"

export const getAll = async (req, res) => {
    const {user} = req
    try{
       
        const videos = await Video.find()
        .select(['_id', 'nombre', 'descripcion', 'fecha', 'url_video', 'is_analyzed', 'duration', 'size_bytes'])
        .populate({
            path: "playerId",
            model: "Player",
            select: ["_id", "nombre", "apellido"]
        })
        .populate({
            path: 'stats',
            match: { userId: user._id }, // solo stats del usuario actual
            select: ['speed_max', 'pasesCompletados', 'goles', 'control_balon', 'regates'],
            populate: {
            path: 'playerId',
            model: 'Player',
            select: ['_id', 'nombre', 'apellido']
            }
        })
        .lean();

        res.json(videos);

    }catch(err){
        console.log(`Error in getAll in video controller: ${err}`)
        res.status(500).json({message: "Ha ocurrido un error, intente más tarde"})
    }
}

export const getOne = async (req, res) => {
    const {id} = req.params
    
    try{
        const videoWithStat = await Video.findById(id)
        .select(['_id', 'nombre', 'descripcion', 'fecha', 'url_video', 'is_analyzed', 'duration', 'size_bytes'])
        .populate({
            path: "playerId",
            model: "Player",
            select: ["_id", "nombre", "apellido"]
        })
        .populate({
            path: 'stats',
            match: { videoId: id }, // solo stats del usuario actual
        })
        .lean();
        res.json(videoWithStat)

    }catch(err){
        console.log(`Error in getOne in video controller: ${err}`)
        res.status(500).json({message: "Ha ocurrido un error, intente más tarde"})
    }
}


export const addVideo = async (req, res) => {
    const file = req.file
    const {playerId, nombre, descripcion, fecha} = req.body || {}
    const {user} = req
    if(!file) return res.status(400).json({message: "El video es obligatorio"})
    
    const generateErrorInAnalyzis = false

    try{
        const {fieldname, originalname, mimetype, buffer, size} = file
        if(mimetype.startsWith("video") === false ){
            return res.status(400).json({message: "Formato no permitido"})
        }
        const player = await Player.findById(playerId)
        if(!player) return res.status(400).json({message: "El jugador no existe"})
        const {secure_url, public_id, duration, size_bytes} = await uploadToCloudinary(buffer);

        const video = new Video({
            nombre,
            descripcion, 
            fecha,
            url_video: secure_url,
            video_public_id: public_id,
            playerId: player._id,
            userId: user._id,
            is_analyzed: "completed",
            duration,
            size_bytes
        })

        const videoSaved = await video.save();

        if(generateErrorInAnalyzis){
            video.is_analyzed = "failed"
            await video.save()
            return res.status(500).json({message: "No se ha podido realizar el analisis del video, intentar mas tarde"})
        }

        const stats = new Stat({
            videoId: videoSaved._id,
            playerId: player._id,
            pasesCompletados: random(10, 30),
            regates: random(5, 20),
            // tiros: random(0, 10),
            intercepciones: random(15, 25),
            faltasCometidas: random(5, 25),
            asistencias: random(0, 5),
            goles: random(2, 7),
            duelosGanados: random(9, 15),
            recuperaciones: random(10, 15),
            speed_max: random(10, 20),
            distancia_recorrida: random(30, 40),
            sprints: random(5, 15),
            
            resistencia: random(60, 90),
            salto: random(60, 90),
            agresividad: random(60, 90),
            centros: random(10, 20),
            definicion: random(70, 80),
            control_balon: random(70, 90),
            agilidad: random(70, 90),

            radar: {
                tecnica: random(60, 90),
                fuerza: random(60, 90),
                velocidad: random(60, 90),
                regate: random(60, 90),
                visionJuego: random(60, 90)
            },
             distribucionPases: {
                cortos: random(5, 15),
                largos: random(2, 10),
                filtrados: random(1, 7),
                centros: random(0, 5)
            },
            distribucionTiros: {
                dentroArea: random(0, 5),
                fueraArea: random(0, 8),
                cabeza: random(0, 5),
                pieIzquierdo: random(0, 5),
                pieDerecho: random(0, 5)
            },
            userId: user._id
        })
        const totalTiros = Object.values(stats.distribucionTiros).reduce( (sum, value) => sum + value, 0)
        stats.tiros = totalTiros
        
        await stats.save()

        player.goles = player.goles + stats.goles
        player.habilidad_destacada = randomSkill(player.posicion)
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

export const retryAnalysis = async (req, res) => {
    const {id} = req.params
    const {user} = req

    try{
        const video = await Video.findById(id)
      
        if(!video){
            return res.status(400).json({message: "Video no encontrado"})
        }
        
        const player = await Player.findById(video.playerId)
          
        const stats = new Stat({
            videoId: id,
            playerId: player._id,
            pasesCompletados: random(10, 30),
            regates: random(5, 20),
            // tiros: random(0, 10),
            intercepciones: random(15, 25),
            faltasCometidas: random(5, 25),
            asistencias: random(0, 5),
            goles: random(2, 7),
            duelosGanados: random(9, 15),
            recuperaciones: random(10, 15),
            speed_max: random(10, 20),
            distancia_recorrida: random(30, 40),
            sprints: random(5, 15),
            
            resistencia: random(60, 90),
            salto: random(60, 90),
            agresividad: random(60, 90),
            centros: random(10, 20),
            definicion: random(70, 80),
            control_balon: random(70, 90),
            agilidad: random(70, 90),

            radar: {
                tecnica: random(60, 90),
                fuerza: random(60, 90),
                velocidad: random(60, 90),
                regate: random(60, 90),
                visionJuego: random(60, 90)
            },
             distribucionPases: {
                cortos: random(5, 15),
                largos: random(2, 10),
                filtrados: random(1, 7),
                centros: random(0, 5)
            },
            distribucionTiros: {
                dentroArea: random(0, 5),
                fueraArea: random(0, 8),
                cabeza: random(0, 5),
                pieIzquierdo: random(0, 5),
                pieDerecho: random(0, 5)
            },
            userId: user._id
        })
        const totalTiros = Object.values(stats.distribucionTiros).reduce( (sum, value) => sum + value, 0)
        stats.tiros = totalTiros
        
        await stats.save()

        player.goles = player.goles + stats.goles
        player.habilidad_destacada = randomSkill(player.posicion)
        await player.save()

        video.is_analyzed = "completed"
        await video.save()

        res.status(200).json({message: "Analisis hecho correctamente", id})

    }catch(err){
        console.log(`Error in retry controller: ${err.message}`)
        res.status(500).json({message: "No se ha podido realizar la operacion"})
    }
}


export const deleteVideo = async (req, res) => {
    const {id} = req.params
    try{

        const video = await Video.findById(id)
        if(!video){
            return res.status(400).json({message: "Video no encontrado"})
        }
        const stat = await Stat.findOne({videoId: id})
        if(stat){
            await stat.deleteOne();
        }
        await video.deleteOne();

        res.json({message: "Video eliminado correctamente"})

    }catch(err){
        console.log(`Error in deleteVideo `)
        res.status(500).json({message: "No se ha podido eliminar el video"})
    }

}