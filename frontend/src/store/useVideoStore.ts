import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


interface VideoStoreState{
    isFetchingVideos: boolean,
    videos: any[],
    fetchVideos: () => Promise<void>
}

export const useVideoStore = create<VideoStoreState>( (set, get) => ({
    isFetchingVideos: false,
    videos: [],

    fetchVideos: async () => {
        set({isFetchingVideos: true})
        try{
            const resp = await axiosInstance.get("/videos")
            set({videos: resp.data})
        }catch(err: any){
            toast.error(err.response?.data?.message || "No se ha podido obtener los videos")
        }finally{
            set({isFetchingVideos: false})
        }
    },
   
}))