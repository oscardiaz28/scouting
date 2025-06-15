import express from 'express'
import { login, logout, signup, verify } from '../controllers/auth.controller.js'
import { checkAuth } from '../middlewares/auth.middleware.js'

export const authRoutes = express.Router()

authRoutes.post("/login", login)
authRoutes.post("/signup", signup)
authRoutes.post("/logout", logout)
authRoutes.get("/verify", checkAuth, verify)