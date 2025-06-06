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

export const Routing = () => {
    return (
        <BrowserRouter>

            <SidebarProvider>
                <Routes>
                    <Route path="/" element={ <LandingPage /> } />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />

                    <Route path="/dashboard" element={ <PrivateLayout /> }>
                        <Route index element={ <DashboardPage /> } />    
                        <Route path="videos" element={ <VideoPage /> } />
                        <Route path="videos/:id" element={<VideoAnalysis />} />
                        <Route path="stats" element={<StatsPage />} />
                        <Route path="players" element={<PlayersPage />} />
                        <Route path="players/:id" element={<PlayerDetailPage />} />
                        <Route path="assistant" element={<AssistantPage />} />
                    </Route>
                </Routes>      
            </SidebarProvider>  

        </BrowserRouter>
    )
}