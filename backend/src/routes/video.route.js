import express from 'express'
import { checkAuth } from '../middlewares/auth.middleware.js';
import { addVideo, getAll, getOne } from '../controllers/video.controller.js';
import { validateObjectId } from '../lib/utils.js';
import multer from 'multer'; //biblioteca para manejar la carga de archivos

export const videoRoutes = express.Router();

//configuracion del tipo de almacenamiento, en este caso en la ram
const storage = multer.memoryStorage()
//creacion de instancia usando la configuracion anterior
const upload = multer({storage: storage})

videoRoutes.get("/", checkAuth, getAll);
//upload.single('video') -> middleware que maneja la carga del archivo bajo el nombre del campo video.
//estara disponible en req.file
videoRoutes.post("/", checkAuth, upload.single('video'), addVideo)

videoRoutes.get("/:id", validateObjectId, checkAuth, getOne)