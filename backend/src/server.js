import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
import { authRoutes } from './routes/auth.route.js'
import { playerRoutes } from './routes/player.route.js'
import { videoRoutes } from './routes/video.route.js'
import { dashboardRoutes } from './routes/dashboard.route.js'
import { statsRoutes } from './routes/stats.route.js'
import path from 'path'

dotenv.config()
const PORT = process.env.PORT
const __dirname = path.resolve()

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
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/stats", statsRoutes)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
})