import { Video } from "../models/video.model.js"

export const getAll = async (req, res) => {
    try{
        const videos = await Video.find()
        res.json(videos)
    }catch(err){
        console.log(`Error in getAll in video controller: ${err}`)
        res.status(500).json({message: "Ha ocurrido un error, intente más tarde"})
    }
}

export const getOne = async (req, res) => {
    const {id} = req.params
    try{
        const video = await Video.findById(id)
        if(!video) return res.status(400).json({message: "Video no encontrado"})
        
        res.json(video)

    }catch(err){
        console.log(`Error in getOne in video controller: ${err}`)
        res.status(500).json({message: "Ha ocurrido un error, intente más tarde"})
    }
}


export const addVideo = async (req, res) => {
    const file = req.file
    const {playerId} = req.body || {}
    try{
        console.log(file)   
        console.log(req.body)

        res.send('add video')
        
    }catch(err){
        console.log(`Error in addVideo in video controller: ${err}`)
        res.status(500).json({message: "Ha ocurrido un error, intente más tarde"})
    }
}