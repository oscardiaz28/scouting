import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingPage } from "../pages/landing/LandingPage"
import { LoginPage } from "../pages/auth/LoginPage"
import { SignupPage } from "../pages/auth/SignupPage"
import { PrivateLayout } from "../layout/PrivateLayout"
import { DashboardPage } from "../pages/dashboard/DashboardPage"
import { SidebarProvider } from "../context/SidebarProvider"
import { VideoPage } from "../pages/video/VideoPage"
import { VideoAnalysis } from "../pages/video/VideoAnalysis"
import StatsPage from "../pages/stats/StatsPage"
import PlayersPage  from "../pages/players/PlayersPage"
import { PlayerDetailPage } from "../pages/players/PlayerDetailPage"
import { AssistantPage } from "../pages/assistant/AssistantPage"
import { Toaster } from "react-hot-toast"
import { PublicRoute } from "../lib/PublicRoute"
import { ProtectedRoute } from "../lib/ProtectedRoute"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"

export const Routing = () => {

    const { authUser, isCheckingAuth, checkAuth} = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if(isCheckingAuth && !authUser){
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader className='size-10 animate-spin' />
            </div>
        )
    }

    return (
        <BrowserRouter>
            <SidebarProvider>
                <Routes>
                    <Route path="/" element={ <PublicRoute> <LandingPage /> </PublicRoute> } />
                    <Route path="login" element={ <PublicRoute><LoginPage /></PublicRoute> } />
                    <Route path="signup" element={ <PublicRoute><SignupPage /></PublicRoute>} />

                    <Route path="/dashboard" element={ <ProtectedRoute><PrivateLayout /></ProtectedRoute> }>
                        <Route index element={ <DashboardPage /> } />    
                        <Route path="videos" element={ <VideoPage /> } />
                        <Route path="stats" element={<StatsPage />} />
                        <Route path="players" element={<PlayersPage />} />
                        <Route path="assistant" element={<AssistantPage />} />
                    </Route>

                    <Route path="/dashboard" element={<PrivateLayout />}>
                        <Route path="players/:id" element={<PlayerDetailPage />} />
                        <Route path="videos/:id" element={<VideoAnalysis />} />
                    </Route>

                </Routes>      
            </SidebarProvider>  
            <Toaster />
        </BrowserRouter>
    )
}