import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export interface Player{
    _id: string,
    dni: string,
    nombre: string,
    apellido: string,
    foto: string,
    posicion: string,
    edad: number,
    partidos: number,
    goles: number,
    es_prospecto: boolean,
    pie_dominante: string,
    habilidad_destacada: string
}

interface PlayerRequest{
    dni: string,
    nombre: string,
    apellido: string,
    posicion: string,
    edad: number,
    goles?: number,
    partidos?: number
}

interface PlayerState{
    selectedPlayer: Player | null,
    players: Player[],
    isPlayersFetchLoading: boolean,
    isAddingPlayer: boolean,
    isUpdatingPlayer: boolean,
    isDeletingPlayer: boolean,

    setSelectedPlayer: (data: Player | null) => void,
    fetchAllPlayers: () => Promise<void>,
    setPlayerAsProspecto: (id: string) => Promise<void>,
    addPlayer: (data: PlayerRequest) => Promise<void>,
    deletePlayer: (id: string) => Promise<void>,
    editPlayer: (id: string, data: Player) => Promise<void>
}

export const usePlayerStore = create<PlayerState>( (set, get) => ({
    selectedPlayer: null,
    players: [],
    isPlayersFetchLoading: false,
    isAddingPlayer: false,
    isUpdatingPlayer: false,
    isDeletingPlayer: false,

    setSelectedPlayer: async(data: Player | null) => {
        set({selectedPlayer: data})
    },

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
            
        }catch(err: any){
            toast.error(err.response?.data?.message || "No se ha podido realizar la operación" )
        }
    },
    addPlayer: async (data) => {
        set({isAddingPlayer: true})
        const {players} = get()
        try{
            const resp = await axiosInstance.post<Player>("/players", data)
            set({players: [...players, resp.data]})
        }catch(err: any){
            throw err
        }finally{
            set({isAddingPlayer: false})
        }
    },
    deletePlayer: async (id) => {
        set({isDeletingPlayer: true})
        const {players} = get()
        try{
            await axiosInstance.delete("/players/"+id)
            const filteredList = players.filter( p => p._id != id )
            set({players: filteredList})
            toast.success("Jugador eliminado correctamente")
        }catch(err: any){
            toast.success(err.response?.data?.message || "No se ha podido eliminar al jugador")
        }finally{
            set({isDeletingPlayer: false})
        }
    },
    editPlayer: async (id, data) => {
        const url = `/players/${id}` 
        set({isUpdatingPlayer: true})
        const {players} = get()
        try{
            const resp = await axiosInstance.put(url, data)
            let arr = players.map( p => {
                if(p._id === id) return resp.data
                else return p
            })
            set({players: arr})
        }catch(err){
            throw err
        }finally{
            set({isUpdatingPlayer: false})
        }
    },

}))