import { Outlet } from "react-router-dom"
import { Sidebar } from "../pages/dashboard/components/Sidebar"
import { useState } from "react"
import { DashboardHeader } from "../pages/dashboard/components/DashboardHeader"

export const PrivateLayout = () => {

  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className="bg-[#111311] w-full flex h-screen overflow-hidden relative">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} 
        />
      <div className="flex-1 overflow-y-auto scrollbar">
        <div className="">
          <DashboardHeader showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <main className="bg-[#111311] mb-3">
            <div className="px-8 ">
              {<Outlet />}
            </div>
          </main>
        </div>
        
      </div>
    </div>
  )
}
