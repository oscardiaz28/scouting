import express from 'express'
import { login, logout, verify } from '../controllers/auth.controller.js'
import { checkAuth } from '../middlewares/auth.middleware.js'

export const authRoutes = express.Router()

authRoutes.get("/login", login)
authRoutes.post("/logout", logout)
authRoutes.get("/verify", checkAuth, verify)