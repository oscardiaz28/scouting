import { ArrowRight, Bell, LogOut, Menu, Search, Upload } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useSidebarState } from '../../../context/SidebarProvider'
import { UploadVideo } from '../../../components/common/UploadVideo'
import { useAuthStore } from '../../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

export const DashboardHeader = ({ showSidebar, setShowSidebar }: {
    showSidebar: boolean, setShowSidebar: Dispatch<SetStateAction<boolean>>
}) => {

    const { setShowMenu } = useSidebarState()
    const { authUser, logout } = useAuthStore()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    if (!authUser) {
        return (
            <div className="flex items-center justify-end px-8 h-[70px] border-1 border-t-0 border-e-0 border-s-0 border-b-zinc-700">
                <div className="flex items-center justify-between gap-3">

                    <button
                        onClick={() => {
                            // setOpenDropdownUser(prev => !prev)
                            navigate("/login")
                        }}
                        className="cursor-pointer bg-[#393939] flex items-center justify-center relative p-2 text-sm px-3 rounded-md border-1 border-white/20">
                        {/* <User className="w-4 h-4" /> */}
                        Iniciar Sesión
                        {/* <DropdownMenuUser open={openDropdownUser} /> */}
                    </button>
                    <button
                        onClick={() => {
                            navigate("/signup")
                        }}
                        className="cursor-pointer bg-white text-zinc-900 font-semibold flex items-center justify-center relative p-2 text-sm px-3 rounded-md">
                        {/* <User className="w-4 h-4" /> */}
                        Registrarse
                        {/* <DropdownMenuUser open={openDropdownUser} /> */}
                    </button>

                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-between px-8 h-[70px]">
            <div className="flex items-center gap-3">
                <div onClick={() => setShowSidebar(prev => !prev)}
                    className="hidden md:flex cursor-pointer transition-transform duration-300 w-6 h-6 hover:bg-gray-600 md:items-center md:justify-center rounded-full" >
                    <ArrowRight className={`transform transition-transform duration-300 ${showSidebar ? 'rotate-180' : 'rotate-0'} w-4 h-4`} />
                </div>
                <Menu onClick={() => setShowMenu(true)} className="cursor-pointer md:hidden" />
                {/* <h2 className="text-lg font-semibold">Dashboard</h2> */}
            </div>

            <div className="flex items-center gap-6">
                <button 
                onClick={() => setShowModal(true)}
                className="bg-blue-600 p-2 rounded-full px-4 text-sm font-semibold cursor-pointer flex items-center gap-3">
                    <Upload className='w-5 h-5' />
                    <p>Subir Video</p>
                </button>
                {showModal && (
                    <UploadVideo
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                )}
                <button className="">
                    <p>{authUser.username}</p>
                </button>
                <button onClick={() => logout()} className='cursor-pointer'>
                    <LogOut className='w-5' />
                </button>
            </div>
        </div>
    )
}
