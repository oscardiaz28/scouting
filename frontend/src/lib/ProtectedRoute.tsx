import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

export const ProtectedRoute = ( {children } : {children: React.ReactNode} ) => {
    const {authUser} = useAuthStore()
    
    return authUser ? children : <Navigate to="/login" />
}