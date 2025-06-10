import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface Player{
    _id: string,
    dni: string,
    nombre: string,
    apellido: string,
    foto: string,
    posicion: string,
    edad: number,
    partidos: number,
    goles: number,
    es_prospecto: boolean
}

interface PlayerState{
    players: Player[],
    isPlayersFetchLoading: boolean,
    fetchAllPlayers: () => Promise<void>,
    setPlayerAsProspecto: (id: string) => Promise<void>
}

export const usePlayerStore = create<PlayerState>( (set, get) => ({
    players: [],
    isPlayersFetchLoading: false,

    fetchAllPlayers: async () => {
        set({isPlayersFetchLoading: true})
        try{
            const resp = await axiosInstance.get("/players")
            set({players: resp.data})
        }catch(err){
            toast.error("No se ha podido obtener los jugadores")
        }finally{
            set({isPlayersFetchLoading: false})
        }
    },
    setPlayerAsProspecto: async (id: string) => {
        const {players} = get()
        try{
            const response = await axiosInstance.put<Player>("/players/"+id+"/marcar-prospecto")
            let arr = players.map( p => {
                if(p._id === id) return response.data
                else return p
            })
            set({players: arr})
            toast.success(response.data?.es_prospecto ? "Jugador marcado como prospecto" 
                : "Jugador ya no es prospecto")
        }catch(err: any){
            toast.error(err.response?.data?.message || "No se ha podido realizar la operación" )
        }
    }

}))