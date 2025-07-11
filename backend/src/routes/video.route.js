import express from 'express'
import { checkAuth } from '../middlewares/auth.middleware.js';
import { addVideo, deleteVideo, getAll, getOne, retryAnalysis, searchVideos } from '../controllers/video.controller.js';
import { validateObjectId } from '../lib/utils.js';
import multer from 'multer'; //biblioteca para manejar la carga de archivos

export const videoRoutes = express.Router();

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

videoRoutes.get("/search", checkAuth, searchVideos)
videoRoutes.get("/", checkAuth, getAll);
videoRoutes.post("/", checkAuth, upload.single('video'), addVideo)
videoRoutes.get("/:id", validateObjectId, getOne)
videoRoutes.post("/retry/:id", validateObjectId, checkAuth, retryAnalysis)
videoRoutes.delete("/:id", validateObjectId, checkAuth, deleteVideo)