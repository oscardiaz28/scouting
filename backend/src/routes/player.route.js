import express from 'express'
import { checkAuth } from '../middlewares/auth.middleware.js'
import { addPlayer, deletePlayer, editPlayer, getAll, getOne, getProspectos, setAndUnsetProspecto} from '../controllers/player.controller.js'
import { validateObjectId } from '../lib/utils.js'

export const playerRoutes = express.Router()

playerRoutes.get("/prospectos", checkAuth, getProspectos)
playerRoutes.get("/", checkAuth, getAll)
playerRoutes.post("/", checkAuth, addPlayer)

playerRoutes.put("/:id/marcar-prospecto", validateObjectId, checkAuth, setAndUnsetProspecto)
playerRoutes.get("/:id", validateObjectId, checkAuth, getOne)
playerRoutes.put("/:id", validateObjectId, checkAuth, editPlayer)
playerRoutes.delete("/:id", validateObjectId, checkAuth, deletePlayer)
