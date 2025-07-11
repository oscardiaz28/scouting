import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePlayerStore } from "../../store/usePlayerStore"
import { capitalize } from "../../utils/utils"
import { Modal } from "../../components/common/Modal"
import { Pen, Plus, X } from "lucide-react"


export default function PlayersPage() {
    const { players, fetchAllPlayers, isPlayersFetchLoading, setPlayerAsProspecto, deletePlayer, selectedPlayer, setSelectedPlayer } = usePlayerStore()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const handleDelete = (id: string) => {
        const resultado = confirm("Estas seguro de eliminar al jugador")
        if (resultado) {
            deletePlayer(id)
        }
    }

    useEffect(() => {
        fetchAllPlayers()
    }, [fetchAllPlayers])


    return (
        <div className="">
            {showModal && (
                <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedPlayer={selectedPlayer}
                />
            )}
            <div className="mb-10 flex items-end justify-between">
                <div>
                    <h2 className="font-bold text-2xl pb-1">Jugadores</h2>
                    <p className="text-gray-400">Administra y agrega jugadores</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="p-2 px-3 rounded-md bg-[#16A34A] cursor-pointer">
                    <Plus className="block md:hidden" />
                    <p className="hidden md:block">Registrar Jugador</p>
                </button>
            </div>

            {isPlayersFetchLoading ? (
                <p>Obteniendo Jugadores</p>

            ) : players.length > 0 ? (
                <div className="w-full overflow-y-auto scrollbar bg-[#1E293B] pb-5 rounded-md">
                    <table className="w-full table-auto border-collapse rounded-md overflow-hidden">
                        <thead className="bg-[#11152a] rounded-md">
                            <tr className="">
                                <th className="py-4 px-3"></th>
                                <th className="py-4 px-3">Jugador</th>
                                <th className="py-4 px-3">Posición</th>
                                <th className="py-4 px-3">Edad</th>
                                {/* <th className="py-4 px-3">Partidos</th> */}
                                <th className="py-4 px-3">Goles</th>
                                <th className="py-4 px-3">
                                    Prospecto
                                </th>
                                <th className="py-4 px-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                players.map((player, idx) => (
                                    <tr key={idx} className="text-center border-b border-b-[#334155df]
                                    hover:bg-[#334155]" >
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
                                        <td className="py-4 px-3">{capitalize(player.posicion)}</td>
                                        <td className="py-4 px-3">{player.edad}</td>
                                        <td className="py-4 px-3">{player.goles}</td>
                                        <td className="py-4 px-3">

                                            <label className="inline-flex items-center me-5 cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer"
                                                    checked={player.es_prospecto}
                                                    onChange={(e) => {
                                                        e.preventDefault()
                                                        setPlayerAsProspecto(player._id)
                                                    }}
                                                />
                                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                                            </label>
                                        </td>
                                        <td className="py-4 px-3 flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => {
                                                    setSelectedPlayer(player)
                                                    setShowModal(true)
                                                }}
                                                className="w-7 h-7 flex items-center rounded-md justify-center bg-blue-500 cursor-pointer">
                                                <Pen className="w-4 text-white" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(player._id)}
                                                className="w-7 h-7 flex items-center rounded-md justify-center bg-rose-500 cursor-pointer">
                                                <X className="w-4 h-4 text-white" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No hay jugadores disponibles</p>
            )}

        </div>
    )
}
