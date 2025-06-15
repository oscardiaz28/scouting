import { Player } from "../models/player.model.js"
import { Stat } from "../models/stat.model.js"

export const generalStats = async (req, res) => {
    const { user } = req
    try {
        const totales = await Stat.aggregate([
            {
                $match: { userId: user._id }
            },
            {
                $group: {
                    _id: null,
                    goles: { $sum: "$goles" },
                    asistencias: { $sum: "$asistencias" },
                    pases: { $sum: "$pasesCompletados" },
                    regates: { $sum: "$regates" },
                    intercepciones: { $sum: "$intercepciones" },
                    duelosGanados: { $sum: "$duelosGanados" },
                    recuperaciones: { $sum: "$recuperaciones" },
                    centros: { $sum: "$centros" },
                    faltas: { $sum: "$faltasCometidas" },
                    tiros: { $sum: "$tiros" }
                },
            },
        ])
        const promedioFisico = await Stat.aggregate([
            {
                $match: { userId: user._id }
            },
            {
                $group: {
                    _id: null,
                    resistencia: { $avg: "$resistencia" },
                    salto: { $avg: "$salto" },
                    agresividad: { $avg: "$agresividad" },
                    agilidad: { $avg: "$agilidad" },
                    definicion: { $avg: "$definicion" },
                    control_balon: { $avg: "$control_balon" }
                }
            }
        ])
        const acciones = await Stat.aggregate([
            {
                $match: { userId: user._id }
            },
            {
                $group: {
                    _id: null,
                    goles: { $sum: "$goles" },
                    asistencias: { $sum: "$asistencias" },
                    faltas: { $sum: "$faltasCometidas" },
                    regates: { $sum: "$regates" },
                    intercepciones: { $sum: "$intercepciones" }
                }
            }
        ])
        const distribucionPosicion = await Player.aggregate([
            {
                $match: { userId: user._id }
            },
            {
                $group: {
                    _id: "$posicion",
                    cantidad: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    posicion: "$_id",
                    cantidad: 1
                }
            }
        ])
        const precisionTiros = await Stat.aggregate([
            {
                $match: { userId: user._id }  // 👈 filtra solo los stats del usuario actual
            },
            {
                $group: {
                    _id: null,
                    goles: { $sum: "$goles" },
                    tiros: { $sum: "$tiros" }
                }
            },
            {
                $project: {
                    _id: 0,
                    goles: 1,
                    tiros: 1,
                    precisionTiros: {
                        $cond: [
                            { $gt: ["$tiros", 0] },
                            { $multiply: [{ $divide: ["$goles", "$tiros"] }, 100] },
                            0
                        ]
                    }
                }
            }
        ])
        const distribucionEdad = await Player.aggregate([
            {
                $match: { userId: user._id }
            },
            {
                $bucket: {
                    groupBy: "$edad",
                    boundaries: [6, 9, 12, 15, 18, 21],
                    default: "21+",
                    output: {
                        cantidad: { $sum: 1 }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    edad: "$_id",
                    cantidad: 1
                }
            }
        ])
        const resp = {
            totales: totales[0],
            promedioFisico: promedioFisico[0],
            acciones: acciones[0],
            distribucionPosicion: distribucionPosicion,
            precisionTiros: precisionTiros[0],
            distribucionEdad: distribucionEdad
        }

        const noData = Object.values(resp).some(stat => stat == null)
        if (noData) return res.status(200).json({})
        res.json(resp)

    } catch (err) {
        console.log(`Error in generalStats: ${err.message}`)
        res.status(500).json({ message: "No se pudo obtener las estadísticas" })
    }
}


export const topPlayers = async (req, res) => {
    const { user } = req
    try {

        const players = await Stat.aggregate([
            {
                $match: { userId: user._id }
            },
            {
                $group: {
                    _id: "$playerId",
                    totalGoles: { $sum: "$goles" },
                    totalAsistencias: { $sum: "$asistencias" },
                    totalRegates: { $sum: "$regates" },
                }
            },
            { $sort: { totalGoles: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "players",
                    localField: "_id",
                    foreignField: "_id",
                    as: "jugador"
                }
            },
            {
                $unwind: "$jugador"
            },
            {
                $project: {
                    _id: 0,
                    jugador: {
                        _id: "$jugador._id",
                        nombre: "$jugador.nombre",
                        apellido: "$jugador.apellido",
                    },
                    totalGoles: 1,
                    totalAsistencias: 1,
                    totalRegates: 1
                }
            }
        ])
        res.json(players)
    } catch (err) {
        res.status(500).json({ message: "No se pudo obtener los jugadores" })
    }
}


export const topAsistencias = async (req, res) => {
const { user } = req
    try {

        const players = await Stat.aggregate([
            {
                $match: { userId: user._id }
            },
            {
                $group: {
                    _id: "$playerId",
                    totalGoles: { $sum: "$goles" },
                    totalAsistencias: { $sum: "$asistencias" },
                    totalRegates: { $sum: "$regates" },
                }
            },
            { $sort: { totalAsistencias: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "players",
                    localField: "_id",
                    foreignField: "_id",
                    as: "jugador"
                }
            },
            {
                $unwind: "$jugador"
            },
            {
                $project: {
                    _id: 0,
                    jugador: {
                        _id: "$jugador._id",
                        nombre: "$jugador.nombre",
                        apellido: "$jugador.apellido",
                    },
                    totalGoles: 1,
                    totalAsistencias: 1,
                    totalRegates: 1
                }
            }
        ])
        res.json(players)
    } catch (err) {
        res.status(500).json({ message: "No se pudo obtener los jugadores" })
    }
}

export const topRegates = async (req, res) => {
const { user } = req
    try {

        const players = await Stat.aggregate([
            {
                $match: { userId: user._id }
            },
            {
                $group: {
                    _id: "$playerId",
                    totalGoles: { $sum: "$goles" },
                    totalAsistencias: { $sum: "$asistencias" },
                    totalRegates: { $sum: "$regates" },
                }
            },
            { $sort: { totalRegates: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "players",
                    localField: "_id",
                    foreignField: "_id",
                    as: "jugador"
                }
            },
            {
                $unwind: "$jugador"
            },
            {
                $project: {
                    _id: 0,
                    jugador: {
                        _id: "$jugador._id",
                        nombre: "$jugador.nombre",
                        apellido: "$jugador.apellido",
                    },
                    totalGoles: 1,
                    totalAsistencias: 1,
                    totalRegates: 1
                }
            }
        ])
        res.json(players)
    } catch (err) {
        res.status(500).json({ message: "No se pudo obtener los jugadores" })
    }
}