import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

export const PublicRoute = ( {children } : {children: React.ReactNode} ) => {
    const {authUser} = useAuthStore()
    
    return !authUser ? children : <Navigate to="/dashboard" />
}