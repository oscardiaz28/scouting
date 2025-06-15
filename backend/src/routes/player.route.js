import express from 'express'
import { checkAuth } from '../middlewares/auth.middleware.js'
import { addPlayer, deletePlayer, editPlayer, exportPlayerStats, getAll, getOne, getPlayerStats, getProspectos, setAndUnsetProspecto, togglePlayerActive} from '../controllers/player.controller.js'
import { validateObjectId } from '../lib/utils.js'

export const playerRoutes = express.Router()

playerRoutes.get("/prospectos", checkAuth, getProspectos)
playerRoutes.get("/", checkAuth, getAll)
playerRoutes.post("/", checkAuth, addPlayer)

playerRoutes.put("/:id/marcar-prospecto", validateObjectId, checkAuth, setAndUnsetProspecto)
playerRoutes.put("/:id/activo", validateObjectId, checkAuth, togglePlayerActive)

playerRoutes.get("/:id/stats", validateObjectId, getPlayerStats)

playerRoutes.get("/:id/export", validateObjectId, exportPlayerStats)

playerRoutes.get("/:id", validateObjectId, getOne)
playerRoutes.put("/:id", validateObjectId, checkAuth, editPlayer)
playerRoutes.delete("/:id", validateObjectId, checkAuth, deletePlayer)
