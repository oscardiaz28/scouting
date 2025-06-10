// components/PlayersTable.tsx
import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePlayerStore } from "../../store/usePlayerStore"
import { capitalize } from "../../utils/utils"

const rowsPerPage = 5

export default function PlayersPage() {
    // const paginatedPlayers = playersData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    // const [page, setPage] = useState(0)
    // const totalPages = Math.ceil(playersData.length / rowsPerPage)
    const { players, fetchAllPlayers, setPlayerAsProspecto } = usePlayerStore()
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllPlayers()
    }, [fetchAllPlayers])


    return (
        <div className="">
            <div className="mb-10 flex items-end justify-between">
                <div>
                    <h2 className="font-bold text-2xl pb-1">Jugadores</h2>
                    <p className="text-gray-400">Administra y agrega jugadores</p>
                </div>
                
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
                            <th className="py-4 px-3">
                                Prospecto
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            players.map((player, idx) => (
                                <tr key={idx} className="text-center border-b border-b-[#232323]
                                hover:bg-[#24282b]" >
                                    <td className="py-4 px-3">{idx + 1}</td>
                                    <td className="py-4 px-3">
                                        <a href={`/dashboard/players/${player._id}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                navigate(`/dashboard/players/${player._id}`)
                                            }}
                                            className="hover:underline">
                                            {capitalize(player.nombre)} {capitalize(player.apellido)}
                                        </a>
                                    </td>
                                    <td className="py-4 px-3">{player.posicion}</td>
                                    <td className="py-4 px-3">{player.edad}</td>
                                    <td className="py-4 px-3">{player.partidos}</td>
                                    <td className="py-4 px-3">{player.goles}</td>
                                    <td className="py-4 px-3">

                                        <label className="inline-flex items-center me-5 cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" 
                                            checked={ player.es_prospecto }
                                            onChange={ (e) => {
                                                e.preventDefault()
                                                setPlayerAsProspecto(player._id)
                                            } }
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Green</span> 
                                        </label>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
