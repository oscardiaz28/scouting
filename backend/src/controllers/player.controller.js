import mongoose from "mongoose"
import { Player } from "../models/player.model.js"
import { Stat } from "../models/stat.model.js"
import { Video } from "../models/video.model.js"
import { exportPDF } from "../lib/utils.js"

export const getAll = async (req, res) => {
    const {user} = req
    try {
        const players = await Player.find({userId: user._id})
        res.json(players)
    } catch (err) {
        console.log(`Error in getAll controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}


export const getOne = async (req, res) => {
    const { id } = req.params
    try {
        const player = await Player.findOne({ _id: id}).select("-password")
        if (!player) {
            return res.status(400).json({ message: "Jugador no encontrado" })
        }
        // TODO: get videos too
        res.status(200).json(player)
    } catch (err) {
        console.log(`Error in getOne controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}

export const getPlayerStats = async (req, res) => {
    const { id } = req.params
    try {
        const stats = await Stat.aggregate([
            {
                //filtra los documentos Stat del jugador
                $match: {
                    playerId: new mongoose.Types.ObjectId(id)
                }
            },
            {
                //agrupa los registros del jugador
                $group: {
                    _id: '$playerId',
                    pasesCompletados: { $avg: '$pasesCompletados' },
                    regates: { $avg: '$regates' },
                    tiros: { $avg: '$tiros' },
                    intercepciones: { $avg: '$intercepciones' },
                    faltasCometidas: { $avg: '$faltasCometidas' },
                    asistencias: { $avg: '$asistencias' },
                    duelosGanados: { $avg: '$duelosGanados' },
                    recuperaciones: { $avg: '$recuperaciones' },
                    goles: { $avg: '$goles' },

                    resistencia: { $avg: '$resistencia' },
                    salto: { $avg: '$salto' },
                    agresividad: { $avg: '$agresividad' },
                    centros: { $avg: '$centros' },
                    definicion: { $avg: '$definicion' },
                    control_balon: { $avg: '$control_balon' },
                    agilidad: { $avg: '$agilidad' },

                    radar_tecnica: { $avg: '$radar.tecnica' },
                    radar_fuerza: { $avg: '$radar.fuerza' },
                    radar_velocidad: { $avg: '$radar.velocidad' },
                    radar_regate: { $avg: '$radar.regate' },
                    radar_visionJuego: { $avg: '$radar.visionJuego' },

                    speed_max: { $avg: '$speed_max' },
                    distancia_recorrida: { $avg: '$distancia_recorrida' },
                    sprints: { $avg: '$sprints' },

                    distribucionPases_cortos: { $avg: '$distribucionPases.cortos' },
                    distribucionPases_largos: { $avg: '$distribucionPases.largos' },
                    distribucionPases_filtrados: { $avg: '$distribucionPases.filtrados' },
                    distribucionPases_centros: { $avg: '$distribucionPases.centros' },

                    distribucionTiros_dentroArea: { $avg: '$distribucionTiros.dentroArea' },
                    distribucionTiros_fueraArea: { $avg: '$distribucionTiros.fueraArea' },
                    distribucionTiros_cabeza: { $avg: '$distribucionTiros.cabeza' },
                    distribucionTiros_pieIzquierdo: { $avg: '$distribucionTiros.pieIzquierdo' },
                    distribucionTiros_pieDerecho: { $avg: '$distribucionTiros.pieDerecho' }
                }
            },
            {
                // reestructura el resultado para obtener un formato legible
                $project: {
                    _id: 0,
                    playerId: '$_id',
                    pasesCompletados: { $round: ["$pasesCompletados", 0] },
                    regates: { $round: ["$regates", 0] },
                    tiros: { $round: ["$tiros", 0] },
                    intercepciones: { $round: ["$intercepciones", 0] },
                    faltasCometidas: { $round: ["$faltasCometidas", 0] },
                    asistencias: { $round: ["$asistencias", 0] },
                    duelosGanados: { $round: ["$duelosGanados", 0] },
                    recuperaciones: { $round: ["$recuperaciones", 0] },
                    goles: { $round: ["$goles", 0] },
                    resistencia: { $round: ["$resistencia", 0] },
                    salto: { $round: ["$salto", 0] },
                    agresividad: { $round: ["$agresividad", 0] },
                    centros: { $round: ["$centros", 0] },
                    definicion: { $round: ["$definicion", 0] },
                    control_balon: { $round: ["$control_balon", 0] },
                    agilidad: { $round: ["$agilidad", 0] },
                    radar: {
                        tecnica: { $round: ["$radar_tecnica", 0] },
                        fuerza: { $round: ["$radar_fuerza", 0] },
                        velocidad: { $round: ["$radar_velocidad", 0] },
                        regate: { $round: ["$radar_regate", 0] },
                        visionJuego: { $round: ["$radar_visionJuego", 0] }
                    },
                    speed_max: { $round: ["$speed_max", 0] },
                    distancia_recorrida: { $round: ["$distancia_recorrida", 0] },
                    sprints: { $round: ["$sprints", 0] },
                    distribucionPases: {
                        cortos: { $round: ["$distribucionPases_cortos", 0] },
                        largos: { $round: ["$distribucionPases_largos", 0] },
                        filtrados: { $round: ["$distribucionPases_filtrados", 0] },
                        centros: { $round: ["$distribucionPases_centros", 0] }
                    },
                    distribucionTiros: {
                        dentroArea: { $round: ["$distribucionTiros_dentroArea", 0] },
                        fueraArea: { $round: ["$distribucionTiros_fueraArea", 0] },
                        cabeza: { $round: ["$distribucionTiros_cabeza", 0] },
                        pieIzquierdo: { $round: ["$distribucionTiros_pieIzquierdo", 0] },
                        pieDerecho: { $round: ["$distribucionTiros_pieDerecho", 0] }
                    }
                }
            }
        ]);
        const resp = stats[0]
        if(resp === undefined) return res.json({})
        res.json(resp)

    } catch (err) {
        console.log(`Error in getPlayerStats controller: ${err.message}`)
        res.status(500).json({ message: "No se ha podido obtener las estadisticas del jugador" })
    }
}

export const exportPlayerStats = async (req, res) => {
    const {id} = req.params
    try{
        const player = await Player.findById(id)
        if(!player) return res.status(400).json({message: "Jugador no encontrado"})
        const stats = await Stat.aggregate([
            {
                //filtra los documentos Stat del jugador
                $match: {
                    playerId: new mongoose.Types.ObjectId(id)
                }
            },
            {
                //agrupa los registros del jugador
                $group: {
                    _id: '$playerId',
                    pasesCompletados: { $avg: '$pasesCompletados' },
                    regates: { $avg: '$regates' },
                    tiros: { $avg: '$tiros' },
                    intercepciones: { $avg: '$intercepciones' },
                    faltasCometidas: { $avg: '$faltasCometidas' },
                    asistencias: { $avg: '$asistencias' },
                    duelosGanados: { $avg: '$duelosGanados' },
                    recuperaciones: { $avg: '$recuperaciones' },
                    goles: { $avg: '$goles' },

                    resistencia: { $avg: '$resistencia' },
                    salto: { $avg: '$salto' },
                    agresividad: { $avg: '$agresividad' },
                    centros: { $avg: '$centros' },
                    definicion: { $avg: '$definicion' },
                    control_balon: { $avg: '$control_balon' },
                    agilidad: { $avg: '$agilidad' },

                    radar_tecnica: { $avg: '$radar.tecnica' },
                    radar_fuerza: { $avg: '$radar.fuerza' },
                    radar_velocidad: { $avg: '$radar.velocidad' },
                    radar_regate: { $avg: '$radar.regate' },
                    radar_visionJuego: { $avg: '$radar.visionJuego' },

                    speed_max: { $avg: '$speed_max' },
                    distancia_recorrida: { $avg: '$distancia_recorrida' },
                    sprints: { $avg: '$sprints' },

                    distribucionPases_cortos: { $avg: '$distribucionPases.cortos' },
                    distribucionPases_largos: { $avg: '$distribucionPases.largos' },
                    distribucionPases_filtrados: { $avg: '$distribucionPases.filtrados' },
                    distribucionPases_centros: { $avg: '$distribucionPases.centros' },

                    distribucionTiros_dentroArea: { $avg: '$distribucionTiros.dentroArea' },
                    distribucionTiros_fueraArea: { $avg: '$distribucionTiros.fueraArea' },
                    distribucionTiros_cabeza: { $avg: '$distribucionTiros.cabeza' },
                    distribucionTiros_pieIzquierdo: { $avg: '$distribucionTiros.pieIzquierdo' },
                    distribucionTiros_pieDerecho: { $avg: '$distribucionTiros.pieDerecho' }
                }
            },
            {
                // reestructura el resultado para obtener un formato legible
                $project: {
                    _id: 0,
                    playerId: '$_id',
                    pasesCompletados: { $round: ["$pasesCompletados", 0] },
                    regates: { $round: ["$regates", 0] },
                    tiros: { $round: ["$tiros", 0] },
                    intercepciones: { $round: ["$intercepciones", 0] },
                    faltasCometidas: { $round: ["$faltasCometidas", 0] },
                    asistencias: { $round: ["$asistencias", 0] },
                    duelosGanados: { $round: ["$duelosGanados", 0] },
                    recuperaciones: { $round: ["$recuperaciones", 0] },
                    goles: { $round: ["$goles", 0] },
                    resistencia: { $round: ["$resistencia", 0] },
                    salto: { $round: ["$salto", 0] },
                    agresividad: { $round: ["$agresividad", 0] },
                    centros: { $round: ["$centros", 0] },
                    definicion: { $round: ["$definicion", 0] },
                    control_balon: { $round: ["$control_balon", 0] },
                    agilidad: { $round: ["$agilidad", 0] },
                    radar: {
                        tecnica: { $round: ["$radar_tecnica", 0] },
                        fuerza: { $round: ["$radar_fuerza", 0] },
                        velocidad: { $round: ["$radar_velocidad", 0] },
                        regate: { $round: ["$radar_regate", 0] },
                        visionJuego: { $round: ["$radar_visionJuego", 0] }
                    },
                    speed_max: { $round: ["$speed_max", 0] },
                    distancia_recorrida: { $round: ["$distancia_recorrida", 0] },
                    sprints: { $round: ["$sprints", 0] },
                    distribucionPases: {
                        cortos: { $round: ["$distribucionPases_cortos", 0] },
                        largos: { $round: ["$distribucionPases_largos", 0] },
                        filtrados: { $round: ["$distribucionPases_filtrados", 0] },
                        centros: { $round: ["$distribucionPases_centros", 0] }
                    },
                    distribucionTiros: {
                        dentroArea: { $round: ["$distribucionTiros_dentroArea", 0] },
                        fueraArea: { $round: ["$distribucionTiros_fueraArea", 0] },
                        cabeza: { $round: ["$distribucionTiros_cabeza", 0] },
                        pieIzquierdo: { $round: ["$distribucionTiros_pieIzquierdo", 0] },
                        pieDerecho: { $round: ["$distribucionTiros_pieDerecho", 0] }
                    }
                }
            }
        ]);
        const resp = stats[0]
        exportPDF(res, player, resp)

    }catch(err){
        console.log(`Error in export controller: ${err.message}`)
        res.status(500).json({message: "No se pudo exportar, intenta más tarde"})
    }
}


export const addPlayer = async (req, res) => {
    const {user} = req
    const { dni, nombre, apellido, posicion, edad, partidos, goles, pie_dominante } = req.body || {}
    try {
        const existPlayer = await Player.findOne({ dni })
        if (existPlayer) return res.status(400).json({ message: "El jugador ya esta registrado, ingrese otro DNI" })

        const player = new Player({
            dni, nombre, apellido, posicion, edad, partidos, goles, pie_dominante, userId: user._id
        })
        const playerSaved = await player.save()
        res.json(playerSaved)

    } catch (err) {
        if (err.name === "ValidationError") {
            const errors = []
            for (const camp in err.errors) {
                errors.push({ message: err.errors[camp].message })
            }
            res.status(400).json(errors)
        } else {
            console.log(`Error in addPlayer controller: ${err}`)
            res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
        }

    }
}

export const editPlayer = async (req, res) => {
    const { id } = req.params
    const {dni} = req.body
    try {
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({ message: "No se han proporcionado datos para actualizar" })
        }

        const player = await Player.findById(id)
        if (!player) return res.status(400).json({ message: "Jugador no encontrado" })

        if(dni && player.dni != dni ){
            const exist = await Player.findOne({dni: dni})
            if(exist) return res.status(400).json({message: "El DNI ya esta registrado"})
        }

        const updatedPlayer = await Player.findOneAndUpdate(
            { _id: player._id },
            req.body,
            { new: true }
        )
        res.json(updatedPlayer)

    } catch (err) {
        console.log(`Error in editPlayer controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}

export const deletePlayer = async (req, res) => {
    const { id } = req.params
    try {
        const player = await Player.findById(id);
        if (!player) {
            return res.status(400).json({ message: "Jugador no encontrado" });
        }
        const stats = await Stat.find({playerId: id})
        const videosId = stats.map( stat => stat.videoId ).filter(Boolean)
        //eliminar videos relacionados
        await Video.deleteMany({_id: { $in: videosId} })
        await Stat.deleteMany({ playerId: id })
        
        await player.deleteOne()
        res.json({ message: "Jugador eliminado correctamente" })
    } catch (err) {
        console.log(`Error in deletePlayer controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}

export const setAndUnsetProspecto = async (req, res) => {
    const { id } = req.params
    try {
        const player = await Player.findById(id)
        if (!player) return res.status(400).json({ message: "Jugador no encontrado" })

        const updatedPlayer = await Player.findByIdAndUpdate(
            id,
            { $set: { es_prospecto: !player.es_prospecto } },
            { new: true }
        )

        res.json(updatedPlayer)
    } catch (err) {
        console.log(`Error in setPlayerAsProspecto controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}

export const togglePlayerActive = async (req, res) => {
    const { id } = req.params
    try{
        const player = await Player.findById(id)
        if (!player) return res.status(400).json({ message: "Jugador no encontrado" })

        const updatedPlayer = await Player.findByIdAndUpdate(
            id,
            { $set: { activo: !player.activo } },
            { new: true }
        )
        res.json(updatedPlayer)
    }catch(err){
        console.log(`Error in togglePlayerActive controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}


export const getProspectos = async (req, res) => {
    try {
        const players = await Player.find({ es_prospecto: true })
        res.send(players)
    } catch (err) {
        console.log(`Error in getProspectos controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}