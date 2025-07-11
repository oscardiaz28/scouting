import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { Readable } from 'node:stream'
import cloudinary from './cloudinary.js'
import PDFDocument from 'pdfkit'
import fs, { stat } from 'node:fs'

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const generateToken = (userId) => {
    const payload = {
        id: userId
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    return token
}

export const sendCookie = ({ name, payload, res }) => {
    res.cookie(name, payload, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
    return true
}


export const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "El id es inválido" })
    }
    next()
}


export const bufferToStream = (buffer) => {
    const readable = new Readable() //clase que permite leer datos en forma de flujo (stream)
    readable.push(buffer)
    readable.push(null) //fin del stream
    return readable
}

export const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "video",
                folder: 'videos'
            },
            (error, result) => {
                if (error) return reject(error)
                resolve({ 
                    secure_url: result.secure_url, 
                    public_id: result.public_id,
                    duration: result.duration,
                    size_bytes: result.bytes
                })
            }
        );
        /**
         * pipe() conecta dos streams
         * toma lo que emite el primer stream, convertido desde el buffer y el segundo es 
         * uploadStream que recibe los datos para subirlo
         */
        bufferToStream(fileBuffer).pipe(uploadStream)
    })
}

export const randomSkill = (posicion) => {
    const technicalSkillsByPosition = {
        arquero: ["reflejos", "bloqueo", "juego aéreo", "despeje con las manos", "saque largo"],
        defensa: ["marcaje", "entradas", "anticipacion", "despeje", "duelos aéreos"],
        mediocampista: ["visión del juego", "control del balón", "distribución", "recuperación"],
        delantero: ["definición", "regate", "velocidad", "remate de cabeza", "finalización"]
    }
    const skills = technicalSkillsByPosition[posicion] || []
    if(skills.length == 0) return ""
    const index = Math.floor(Math.random() * skills.length)
    return skills[index]
}

export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const exportPDF = (res, player, stats) => {

    const columnas = [
        {
            title: "Fisico",
            datos: [
                { label: "Fuerza", value: stats.radar.fuerza },
                { label: "Velocidad", value: stats.radar.velocidad },
                { label: "Resistencia", value: stats.resistencia },
                { label: "Salto", value: stats.salto },
            ]
        },
        {
            title: "Regate",
            datos: [
                { label: "Agilidad", value: stats.agilidad },
                { label: "Técnica", value: stats.radar.tecnica },
                { label: "Sprints", value: stats.sprints },
                { label: "Control de Balón", value: stats.control_balon },
            ]
        },
        {
            title: "Defensa",
            datos: [
                { label: "Intercepciones", value: stats.intercepciones },
                { label: "Recuperaciones", value: stats.recuperaciones },
                { label: "Duelos Ganados", value: stats.duelosGanados },
                { label: "Faltas Cometidas", value: stats.faltasCometidas },
            ]
        },
        {
            title: "Pase",
            datos: [
                { label: "Visión del Juego", value: stats.radar.visionJuego },
                { label: "Definición", value: stats.definicion },
                { label: "Centros", value: stats.distribucionPases.centros },
                { label: "Asistencias", value: stats.asistencias },
                { label: "Filtrados", value: stats.distribucionPases.filtrados },
                { label: "Largos", value: stats.distribucionPases.largos },
                { label: "Cortos", value: stats.distribucionPases.cortos }
            ]
        }
    ]

    const dataPlayer = [
        ["Nombre:", `${player.nombre}  ${player.apellido}`],
        ["Edad:", player.edad.toString()],
        ["Club:", "FB Barcelona"],
        ["Posición:", player.posicion ],
        ["Pie Dominante:", player.pie_dominante]
    ]

    const startX = 30;
    const startY = 300;
    const columnWidth = 150;
    const valueOffset = 100;
    const lineHeight  = 25;

    const playerWidth = 80
    const startYPlayer = 130
    const playerOffset = 90

    const doc = new PDFDocument()
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="reporte.pdf"');

    doc.pipe(res)
    doc.font("Helvetica-Bold").fontSize(20).text(`Ficha del Jugador`, { align: 'center' });
    doc.moveDown()

    const baseX = startX
    let currentY = startYPlayer

    doc.fontSize(14);
    doc.table({
        rowStyles: (i) => {
            if (i % 2 === 0) return { backgroundColor: "#DBE2F4", };
        },
        data: dataPlayer
    })


    columnas.forEach( (columna, i) => {
        const baseX = startX + i * columnWidth;
        let currentY = startY;
        doc
            .font('Helvetica-Bold')
            .fontSize(12)
            .fillColor('black')
            .text(columna.title, baseX, currentY);
        currentY += lineHeight;

        columna.datos.forEach(item => {
            doc
                .font('Helvetica')
                .fontSize(12)
                .text(item.label, baseX, currentY);
            doc
                .font('Helvetica-Bold')
                .fontSize(12)
                .text(item.value.toString(), baseX + valueOffset, currentY);
            currentY += lineHeight;
        });
    });

    doc.end();
}