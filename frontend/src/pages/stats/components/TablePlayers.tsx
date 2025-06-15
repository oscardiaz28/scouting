import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../lib/axios";

interface JugadorInfo{
    _id: string,
    nombre: string,
    apellido: string
}

interface Result{
    totalGoles: number,
    totalAsistencias: number,
    totalRegates: number,
    jugador: JugadorInfo
}

export const TablePlayers = () => {

    const [value, setValue] = useState("goles")
    const [data, setData] = useState<Result[] | []>([])

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement> ) => {
        const value = e.target.value 
        setValue(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const resp = await axiosInstance.get("/stats/players/"+value)
                setData(resp.data)
            }catch(err){
                toast.error("No se ha podido obtener los datos")
            }
        }
        fetchData()
    }, [value])


    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-xl">Top 5 Jugadores</h2>
                <select onChange={handleSelect} name="" id="" className="border-1 border-[#3c3030] p-2 px-4 rounded-md appearance-none 
            bg-[#0F0E0E] outline-0">
                    <option value="goles">Goles</option>
                    <option value="asistencias">Asistencias</option>
                    <option value="regates">Regates</option>
                </select>
            </div>
            <div className="overflow-auto rounded-lg shadow" >
                <table className="min-w-full bg-[#1A1C1E]">
                    <thead>
                        <tr className="bg-[#0F0E0E] text-white uppercase text-sm leading-normal ">
                            <th className="py-3 px-6 text-left">Jugador</th>
                            <th className="py-3 px-6 text-center">Goles</th>
                            <th className="py-3 px-6 text-center">Asistencias</th>
                            <th className="py-3 px-6 text-center">Regates</th>
                        </tr>
                    </thead>
                    <tbody className="text-base font-normal text-white">
                        {data.map((player, i) => (
                            <tr key={i} className="border-b border-[#232323] ">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {player.jugador.nombre} {player.jugador.apellido}
                                    </td>
                                <td className="py-3 px-6 text-center">{player.totalGoles}</td>
                                <td className="py-3 px-6 text-center">{player.totalAsistencias}</td>
                                <td className="py-3 px-6 text-center">{player.totalRegates}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}