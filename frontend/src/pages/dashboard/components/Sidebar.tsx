import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Logo } from "../../../components/common/Logo"
import { Link, useLocation } from "react-router-dom"
import { ChartBarIcon, ChevronRight, Home, MessageCircle, Settings, User, Video, X } from "lucide-react"
import { useSidebarState } from "../../../context/SidebarProvider"
import { isPathActive } from "../../../utils/utils"

interface Props{
    showSidebar: boolean,
    setShowSidebar: Dispatch<SetStateAction<boolean>>,
}

interface DesktopProps{
    showSidebar: boolean,
    setShowSidebar: Dispatch<SetStateAction<boolean>>
}

const sidebarItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
        icon: <Home className="w-4 h-4 text-gray-200" />
    },
    {
        id: "videos",
        label: "Videos",
        path: "/dashboard/videos",
        icon: <Video className="w-4 h-4 text-gray-200" />
    },
    {
        id: "jugadores",
        label: "Jugadores",
        path: "/dashboard/players",
        icon: <User className="w-4 h-4 text-gray-200" />
    },
    {
        id: "estadisticas",
        label: "Estadisticas",
        path: "/dashboard/stats",
        icon: <ChartBarIcon className="w-4 h-4 text-gray-200" />
    },
    {
        id: "ia",
        label: "IA",
        path: "/dashboard/assistant",
        icon: <MessageCircle className="w-4 h-4 text-gray-200" />
    }
]

export const Sidebar = ( {showSidebar, setShowSidebar } : Props ) => {

  return (
    <>
        <DesktopNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <MobileNavbar  />
    </>
  )
}

const MobileNavbar = ( ) => {

    const location = useLocation()
    const pathname = location.pathname
    const {showMenu, setShowMenu} = useSidebarState()

    return (
        <div className={`bg-[#141516] sahdow-md border-r border-gray-800 transition-all duration-400 overflow-hidden fixed top-0 left-0 h-full ${showMenu ? "w-64" : "w-0"} md:hidden md:w-0 z-50`}>
            <div className="p-4 px-5">
                <div className="flex items-center justify-between">
                    <Logo />
                    <X 
                    onClick={ () => setShowMenu(false) }
                    className="mt-1 w-5 h-5 cursor-pointer" />
                </div>

                <div className="flex flex-col gap-4 mt-9">

                    {sidebarItems.map( item => (
                        <Link key={item.id} to={item.path}  className={`${ isPathActive(pathname, item.path) ? "bg-[#272A30]" : ""} rounded-full p-2 px-4`} >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <p className="text-gray-200 text-sm font-semibold">{item.label}</p>
                                { pathname == item.path && (
                                    <ChevronRight className="w-4 h-4 mt-[2.5px] ml-auto" />
                                ) }
                            </div>
                        </Link>
                    ) )}
                </div>
            </div>
        </div>
    )

}

const DesktopNavbar = ( {showSidebar, setShowSidebar} : DesktopProps ) => {

    const location = useLocation()
    const pathname = location.pathname

    useEffect(() => {
        const handleSize = () => {
            if(showSidebar == false && window.innerWidth <= 768 ){
                setShowSidebar(true)
            }
        }
        window.addEventListener('resize', handleSize)
        return () => window.removeEventListener('resize', handleSize)
    })

    return (
        <div className={`${showSidebar ? "w-64" : "w-0" } bg-[#1A1C1E] border-r border-gray-800 transition-all duration-400 overflow-hidden hidden md:block `}>
            <div className="p-4 px-5">
                <Logo />
                <div className="flex flex-col gap-4 mt-9">

                    {sidebarItems.map( item => (
                        <Link key={item.id} to={item.path}  className={`${ isPathActive(pathname, item.path) ? "bg-[#272A30]" : ""} rounded-full p-2 px-4`} >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <p className="text-gray-200 text-sm font-semibold">{item.label}</p>
                                { pathname == item.path && (
                                    <ChevronRight className="w-4 h-4 mt-[2.5px] ml-auto" />
                                ) }
                            </div>
                        </Link>
                    ) )}
                </div>
            </div>
        </div>
    )
}
