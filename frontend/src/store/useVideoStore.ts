import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


interface VideoStoreState{
    isFetchingVideos: boolean,
    videos: any[],
    indicators: any[]
    fetchVideos: () => Promise<void>
    deleteVideo: (videoId: string) => Promise<void>
}

export const useVideoStore = create<VideoStoreState>( (set, get) => ({
    isFetchingVideos: true,
    videos: [],
    indicators: [],

    fetchVideos: async () => {
        try{
            const resp = await axiosInstance.get("/videos")
            const data = resp.data
            
            const allStates = ["completed", "pending", "failed"]
            const counts = allStates.reduce((acc: any, state) => {
                acc[state] = 0;
                return acc;
            }, {});
            for (const item of data) {
                const state = item.is_analyzed;
                if (counts.hasOwnProperty(state)) {
                    counts[state]++;
                }
            }
            const result = Object.entries(counts).map(([state, count]) => ({ state, count }));

            set({indicators: result})
            set({videos: resp.data})

        }catch(err: any){
            toast.error(err.response?.data?.message || "No se ha podido obtener los videos")
        }finally{
            set({isFetchingVideos: false})
        }
    },

    deleteVideo: async (videoId: string) => {
        const {videos} = get()
        await axiosInstance.delete(`/videos/${videoId}`)

        const filteredList = videos.filter( video => video._id !== videoId )

        const allStates = ["completed", "pending", "failed"]
        const counts = allStates.reduce((acc: any, state) => {
            acc[state] = 0;
            return acc;
        }, {});
        for (const item of filteredList) {
            const state = item.is_analyzed;
            if (counts.hasOwnProperty(state)) {
                counts[state]++;
            }
        }
        const result = Object.entries(counts).map(([state, count]) => ({ state, count }));

        set({indicators: result})

        set({videos: filteredList})
    }
   
}))