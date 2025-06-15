import express from 'express'
import { checkAuth } from '../middlewares/auth.middleware.js'
import { generalStats, topAsistencias, topPlayers, topRegates } from '../controllers/stat.controller.js'

export const statsRoutes = express.Router()

statsRoutes.get("/", checkAuth, generalStats)
statsRoutes.get("/players/goles", checkAuth, topPlayers)
statsRoutes.get("/players/asistencias", checkAuth, topAsistencias)
statsRoutes.get("/players/regates", checkAuth, topRegates)