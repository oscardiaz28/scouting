import { Outlet } from "react-router-dom"
import { Sidebar } from "../pages/dashboard/components/Sidebar"
import { useState } from "react"
import { DashboardHeader } from "../pages/dashboard/components/DashboardHeader"
import { useAuthStore } from "../store/useAuthStore"

export const PrivateLayout = () => {

  const [showSidebar, setShowSidebar] = useState(true)
  const { authUser } = useAuthStore()

  return (
    <div className="bg-[#020617] w-full flex h-screen overflow-hidden relative">
      {authUser && (
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} 
                />
      )}
      
      <div className="flex-1 overflow-y-auto scrollbar">
        <div className="">
          <DashboardHeader showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <main className="bg-[#020617] mb-3">
            <div className="px-4 md:px-6">
              {<Outlet />}
            </div>
          </main>
        </div>
        
      </div>
    </div>
  )
}
