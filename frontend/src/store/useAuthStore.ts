import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface AuthUser{
    _id: string,
    username: string,
    email: string
}

interface AuthState{
    authUser: AuthUser | null,
    isLoggingIn: boolean,
    isSigningIn: boolean,
    isCheckingAuth: boolean,
    login: ( data: {email: string, password: string} ) => Promise<void>,
    checkAuth: () => Promise<void>,
    logout: () => Promise<void>
}


export const useAuthStore = create<AuthState>( (set) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningIn: false,
    isCheckingAuth: true,
    login: async (data : {email: string, password: string}  ) => {
        set({isLoggingIn: true})
        try{
            const response = await axiosInstance.post("/auth/login", data)
            set({authUser: response.data})
            toast.success("Ha iniciado sesión")
        }catch(err: any){
            console.log(err.response.data)
            toast.error(err.response?.data?.message || "No se ha podido iniciar sesión" )
        }finally{
            set({isLoggingIn: false})
        }
    },
    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/verify")
            set({authUser: res.data})
        }catch(err){
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },
    logout: async () => {
        try{
            const resp = await axiosInstance.post("/auth/logout")
            console.log(resp.data)
            set({authUser: null})
        }catch(err: any){
            toast.error(err.response.data.message)
        }
    }
}))