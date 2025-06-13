import mongoose from "mongoose"
import { Player } from "../models/player.model.js"
import { Stat } from "../models/stat.model.js"
import { Video } from "../models/video.model.js"

export const getAll = async (req, res) => {
    try {
        const players = await Player.find()
        res.json(players)
    } catch (err) {
        console.log(`Error in getAll controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}


export const getOne = async (req, res) => {
    const { id } = req.params
    try {
        const player = await Player.findById(id).select("-password")
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
                    // $avg -> calcula el promedio
                    pasesCompletados: { $avg: '$pasesCompletados' },
                    regates: { $avg: '$regates' },
                    tiros: { $avg: '$tiros' },
                    intercepciones: { $avg: '$intercepciones' },
                    faltasCometidas: { $avg: '$faltasCometidas' },
                    speed_max: { $avg: '$speed_max' },
                    distancia_recorrida: { $avg: '$distancia_recorrida' },
                    sprints: { $avg: '$sprints' },
                    radar_tecnica: { $avg: '$radar.tecnica' },
                    radar_resistencia: { $avg: '$radar.resistencia' },
                    radar_fuerza: { $avg: '$radar.fuerza' },
                    radar_visionJuego: { $avg: '$radar.visionJuego' }
                }
            },
            {
                // reestructura el resultado para obtener un formato legible
                $project: {
                    _id: 0,
                    playerId: '$_id',
                    pasesCompletados: 1,
                    regates: 1,
                    tiros: 1,
                    intercepciones: 1,
                    faltasCometidas: 1,
                    speed_max: 1,
                    distancia_recorrida: 1,
                    sprints: 1,
                    radar: {
                        tecnica: '$radar_tecnica',
                        resistencia: '$radar_resistencia',
                        fuerza: '$radar_fuerza',
                        visionJuego: '$radar_visionJuego'
                    }
                }
            }
        ])
        res.json(stats[0])

    } catch (err) {
        console.log(`Error in getPlayerStats controller: ${err.message}`)
        res.status(500).json({ message: "No se ha podido obtener las estadisticas del jugador" })
    }
}

export const addPlayer = async (req, res) => {
    const { dni, nombre, apellido, posicion, edad, partidos, goles } = req.body || {}
    try {
        const existPlayer = await Player.findOne({ dni })
        if (existPlayer) return res.status(400).json({ message: "El jugador ya esta registrado, ingrese otro DNI" })

        const player = new Player({
            dni, nombre, apellido, posicion, edad, partidos, goles
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
    try {
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({ message: "No se han proporcionado datos para actualizar" })
        }

        const player = await Player.findById(id)
        if (!player) return res.status(400).json({ message: "Jugador no encontrado" })

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
        const player = await Player.findOneAndDelete(id)
        if (!player) return res.status(400).json({ message: "Jugador no encontrado" })
        //TODO: eliminar videos relacionados
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

export const getProspectos = async (req, res) => {
    try {
        const players = await Player.find({ es_prospecto: true })
        res.send(players)
    } catch (err) {
        console.log(`Error in getProspectos controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}