import { Bell, LogOut, Search, User } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Logo } from "./Logo"

export const Navbar = () => {

    return (
        <>
            <DesktopNavbar />
        </>
    )
}

const DesktopNavbar = () => {
    const [openDropdownUser, setOpenDropdownUser] = useState(false)
    
    return (
        <div className="border-b border-[#2c2c2c]/70 bg-[#111]/30 backdrop-blur-xl fixed w-full z-50 top-0 left-0">
            <nav className="w-full h-[70px] flex items-center justify-between max-w-[1300px] px-4 mx-auto">
                <Logo />
                <div className="flex items-center justify-between gap-3">
                    <button className="cursor-pointer hover:bg-[#393939] w-9 h-9 flex items-center justify-center rounded-full">
                        <Search className="w-4 h-4" />
                    </button>
                    <button className="cursor-pointer hover:bg-[#393939] w-9 h-9 flex items-center justify-center rounded-full">
                        <Bell className="w-4 h-4" />
                    </button>
                    <button 
                    onClick={ () => setOpenDropdownUser(prev => !prev) }
                    className="cursor-pointer hover:bg-[#393939] w-9 h-9 flex items-center justify-center rounded-full relative">
                        <User className="w-4 h-4" />
                        <DropdownMenuUser open={openDropdownUser} />
                    </button>
                </div>
            </nav>
        </div>
    )
}


const DropdownMenuUser = ( {open} : {open: boolean} ) => {
    return (
        <div className={`${open ? "block" : "hidden"} shadow w-[180px] bg-[#2c2c2c] border-1 border-[#1a1a1a] rounded-md absolute top-full right-0 text-sm py-2 px-2`}>
            <p className="text-nowrap border-b border-gray-500 pb-2 mb-2">Logueado como John</p>
            <div className="flex flex-col gap-1">
                <Link to={"/dashboard"} className="py-1 px-2 hover:bg-[#222] flex items-center gap-1 rounded-md px-3">
                    <User className="w-4" />
                    <p>Dashboard</p>
                </Link>
                <Link to={"/account"} className="py-1 px-2 hover:bg-[#222] flex items-center gap-1 rounded-md px-3">
                    <LogOut className="w-4" />
                    <p className="text-nowrap">Cerrar Sesión</p>
                </Link>
            </div>
        </div>
    )
}