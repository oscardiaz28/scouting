import { Player } from "../models/player.model.js"

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
    const {id} = req.params
    try {
        const player = await Player.findById(id).select("-password")
        if(!player){
            return res.status(400).json({message: "Jugador no encontrado"})
        }
        // TODO: get videos too
        res.status(200).json(player)
    } catch (err) {
        console.log(`Error in getOne controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}

export const addPlayer = async (req, res) => {
    const {dni, nombre, apellido, posicion, edad, partidos, goles} = req.body || {}
    try {
        const existPlayer = await Player.findOne({dni})
        if(existPlayer) return res.status(400).json({message: "El jugador ya esta registrado, ingrese otro DNI"})

        const player = new Player({
            dni, nombre, apellido, posicion, edad, partidos, goles
        })
        const playerSaved = await player.save()
        res.json(playerSaved)

    } catch (err) {
        if(err.name === "ValidationError"){
            const errors = []
            for(const camp in err.errors){
                errors.push({message: err.errors[camp].message})
            }
            res.status(400).json(errors)
        }else{
            console.log(`Error in addPlayer controller: ${err}`)
            res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
        }
        
    }
}

export const editPlayer = async (req, res) => {
    const {id} = req.params
    try {
        if(!req.body || Object.keys(req.body).length == 0){
            return res.status(400).json({message: "No se han proporcionado datos para actualizar"})
        }

        const player = await Player.findById(id)
        if(!player) return res.status(400).json({message: "Jugador no encontrado"})
        
        const updatedPlayer = await Player.findOneAndUpdate(
            {_id: player._id},
            req.body,
            {new: true}
        )
        res.json(updatedPlayer)

    } catch (err) {
        console.log(`Error in editPlayer controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}

export const deletePlayer = async (req, res) => {
    const {id} = req.params
    try {
        const player = await Player.findOneAndDelete(id)
        if(!player) return res.status(400).json({message: "Jugador no encontrado"})
        //TODO: eliminar videos relacionados
        res.json({message: "Jugador eliminado correctamente"})
    } catch (err) {
        console.log(`Error in deletePlayer controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}

export const setAndUnsetProspecto = async (req, res) => {
    const {id} = req.params
    try{
        const player = await Player.findById(id)
        if(!player) return res.status(400).json({message: "Jugador no encontrado"})

        const updatedPlayer = await Player.findByIdAndUpdate(
            id,
            { $set: {es_prospecto: !player.es_prospecto} },
            {new: true}
        )
        
        res.json(updatedPlayer)
    }catch(err){
        console.log(`Error in setPlayerAsProspecto controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}

export const getProspectos = async (req, res) => {
    try{
        const players = await Player.find({es_prospecto: true})
        res.send(players)
    }catch(err){
        console.log(`Error in getProspectos controller: ${err}`)
        res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde" })
    }
}