import { Player } from "../models/player.model.js"
import { Video } from "../models/video.model.js"

export const dashboardData = async (req, res) => {
    const {user} = req
    try {
        const videos = await Video.find({userId: user._id})
        const registeredPlayers = await Player.find({userId: user._id})
        const prospectPlayers = await Player.find({ es_prospecto: true, userId: user._id })
        const activePlayers = await Player.find({ activo: true, userId: user._id })

        // TODO -> complete data
        const skills = await Player.find()
        const filtered = skills.filter(skill => skill.habilidad_destacada).map( skill => skill.habilidad_destacada )

        const resp = {
            videos: videos.length,
            registeredPlayers: registeredPlayers.length,
            prospectPlayers: prospectPlayers.length,
            activePlayers: activePlayers.length
        }
        res.send(resp)

    } catch (err) {

    }
}