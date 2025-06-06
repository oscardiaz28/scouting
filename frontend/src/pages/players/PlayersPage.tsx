// components/PlayersTable.tsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const playersData = [
    { name: "John Doe", position: "Delantero", edad: 18, partidos: 20, goles: 5, habilidad: "Regate" },
    { name: "Carlos Pérez", position: "Centrocampista", edad: 22, partidos: 25, goles: 3, habilidad: "Pase largo" },
    { name: "Luis Fernández", position: "Defensa", edad: 24, partidos: 30, goles: 1, habilidad: "Intercepción" },
    { name: "Andrés Gómez", position: "Portero", edad: 20, partidos: 28, goles: 0, habilidad: "Reflejos" },
    { name: "Marco Silva", position: "Delantero", edad: 21, partidos: 18, goles: 8, habilidad: "Remate" },
    { name: "Daniel Ríos", position: "Centrocampista", edad: 19, partidos: 22, goles: 2, habilidad: "Visión" },
    { name: "Esteban Núñez", position: "Defensa", edad: 23, partidos: 27, goles: 0, habilidad: "Entrada fuerte" },
    { name: "Matías Ramírez", position: "Delantero", edad: 20, partidos: 19, goles: 6, habilidad: "Velocidad" },
    { name: "Santiago León", position: "Centrocampista", edad: 25, partidos: 26, goles: 4, habilidad: "Control de balón" },
    { name: "Julio Torres", position: "Defensa", edad: 21, partidos: 29, goles: 0, habilidad: "Marcaje" },
    { name: "Alonso Vega", position: "Portero", edad: 22, partidos: 30, goles: 0, habilidad: "Atajada uno a uno" },
    { name: "Fabián Méndez", position: "Centrocampista", edad: 24, partidos: 21, goles: 5, habilidad: "Distribución" },
    { name: "Ricardo Soto", position: "Delantero", edad: 23, partidos: 24, goles: 7, habilidad: "Definición" },
    { name: "Héctor Molina", position: "Defensa", edad: 26, partidos: 30, goles: 1, habilidad: "Juego aéreo" },
    { name: "Iván Castillo", position: "Centrocampista", edad: 20, partidos: 23, goles: 2, habilidad: "Presión alta" },
    { name: "Gabriel Ruiz", position: "Portero", edad: 19, partidos: 16, goles: 0, habilidad: "Salida rápida" },
    { name: "Nicolás Herrera", position: "Delantero", edad: 22, partidos: 20, goles: 9, habilidad: "Dribbling" },
    { name: "Cristian Bravo", position: "Defensa", edad: 25, partidos: 28, goles: 0, habilidad: "Bloqueo" },
    { name: "Oscar Benítez", position: "Centrocampista", edad: 21, partidos: 27, goles: 3, habilidad: "Cambio de juego" },
    { name: "Thiago Morales", position: "Delantero", edad: 18, partidos: 15, goles: 4, habilidad: "Desmarque" }
]

const rowsPerPage = 5

export default function PlayersPage() {
    const [page, setPage] = useState(0)
    const totalPages = Math.ceil(playersData.length / rowsPerPage)
    const navigate = useNavigate()

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1)
    }
    const handlePrev = () => {
        if (page > 0) setPage(page - 1)
    }

    const paginatedPlayers = playersData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

    return (
        <div className="">
            <div className="mb-10">
                <h2 className="font-bold text-2xl pb-1">Jugadores</h2>
                <p className="text-gray-400">Administra y agrega jugadores</p>
            </div>

            {/* Table Data */}
            <div className="w-full overflow-y-auto scrollbar bg-[#1A1C1E] pb-5 rounded-md">
                <table className="w-full table-auto border-collapse rounded-md overflow-hidden">
                    <thead className="bg-[#0f0e0e] rounded-md">
                        <tr className="">
                            <th className="py-4 px-3"></th>
                            <th className="py-4 px-3">Jugador</th>
                            <th className="py-4 px-3">Posición</th>
                            <th className="py-4 px-3">Edad</th>
                            <th className="py-4 px-3">Partidos</th>
                            <th className="py-4 px-3">Goles</th>
                            <th className="py-4 px-3">Habilidad Destacada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginatedPlayers.map( (player, idx) => (
                                <tr key={idx} className="text-center border-b border-b-[#232323] cursor-pointer 
                                hover:bg-[#24282b]" onClick={ () => navigate("/dashboard/players/23213") }>
                                    <td className="py-4 px-3">{idx + 1}</td>
                                    <td className="py-4 px-3">{player.name}</td>
                                    <td className="py-4 px-3">{player.position}</td>
                                    <td className="py-4 px-3">{player.edad}</td>
                                    <td className="py-4 px-3">{player.partidos}</td>
                                    <td className="py-4 px-3">{player.goles}</td>
                                    <td className="py-4 px-3">{player.habilidad}</td>
                                </tr>
                            ) )
                        }
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-4">
                <button 
                className={`bg-[#1A1C1E] p-2 px-4 rounded-md cursor-pointer border-1 border-gray-800 
                hover:bg-[#282a2c] ${ page == 0 ? "invisible" : "" }`}
                onClick={handlePrev} disabled={page === 0}>
                    Anterior
                </button>
                <span className="text-white text-sm col-span-2">
                    Pagina {page + 1} de {totalPages}
                </span>
                <button 
                className={`bg-[#1A1C1E] p-2 px-4 rounded-md cursor-pointer border-1 border-gray-800 
                    hover:bg-[#282a2c] ${ page === totalPages - 1 ? "invisible" : "" }`}
                onClick={handleNext} disabled={page === totalPages - 1}>
                    Siguiente
                </button>
            </div>

        </div>
    )
}
