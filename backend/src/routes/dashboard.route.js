import express from 'express'
import { checkAuth } from '../middlewares/auth.middleware.js'
import { dashboardData } from '../controllers/dashboard.controller.js'

export const dashboardRoutes = express.Router()

dashboardRoutes.get("/", checkAuth, dashboardData)