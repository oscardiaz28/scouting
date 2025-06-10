import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
import { authRoutes } from './routes/auth.route.js'
import { playerRoutes } from './routes/player.route.js'
import { videoRoutes } from './routes/video.route.js'

dotenv.config()
const PORT = process.env.PORT

const app = express()
connectDB()

app.use(morgan('dev'))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/auth", authRoutes)
app.use("/api/players", playerRoutes)
app.use("/api/videos", videoRoutes)

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
})