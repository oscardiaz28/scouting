import { LogOut, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Logo } from "./Logo"

export const Navbar = () => {

    return (
        <>
            <DesktopNavbar />
        </>
    )
}

const DesktopNavbar = () => {
    const navigate = useNavigate()
    
    return (
        <div className="border-b border-[#2c2c2c]/70 bg-[#111]/30 backdrop-blur-xl fixed w-full z-50 top-0 left-0">
            <nav className="w-full h-[70px] flex items-center justify-between max-w-[1300px] px-4 mx-auto">
                <Logo />
                <div className="flex items-center justify-between gap-3">
                    
                         <button 
                        onClick={ () => {
                            // setOpenDropdownUser(prev => !prev)
                            navigate("/login")
                        } }
                        className="cursor-pointer bg-[#393939] flex items-center justify-center relative p-2 text-sm px-3 rounded-md border-1 border-white/20">
                            {/* <User className="w-4 h-4" /> */}
                            Iniciar Sesión
                            {/* <DropdownMenuUser open={openDropdownUser} /> */}
                        </button>
                        <button 
                        onClick={ () => {
                            navigate("/signup")
                        } }
                        className="cursor-pointer bg-white text-zinc-900 font-semibold flex items-center justify-center relative p-2 text-sm px-3 rounded-md">
                            {/* <User className="w-4 h-4" /> */}
                            Registrarse
                            {/* <DropdownMenuUser open={openDropdownUser} /> */}
                        </button>
                    
                </div>
            </nav>
        </div>
    )
}

