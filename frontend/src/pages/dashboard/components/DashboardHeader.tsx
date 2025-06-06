import { ArrowRight, Bell, Menu, Search, Upload } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import { useSidebarState } from '../../../context/SidebarProvider'
import { UploadVideo } from '../../../components/common/UploadVideo'

export const DashboardHeader = ( {showSidebar, setShowSidebar} : {
    showSidebar: boolean, setShowSidebar: Dispatch<SetStateAction<boolean>>
} ) => {

    const {setShowMenu} = useSidebarState()

    return (
        <div className="flex items-center justify-between px-8 h-[70px]">
            <div className="flex items-center gap-3">
                <div onClick={() => setShowSidebar(prev => !prev)}
                    className="hidden md:flex cursor-pointer transition-transform duration-300 w-6 h-6 hover:bg-gray-600 md:items-center md:justify-center rounded-full" >
                    <ArrowRight className={`transform transition-transform duration-300 ${showSidebar ? 'rotate-180' : 'rotate-0'} w-4 h-4`} />
                </div>
                <Menu onClick={ () => setShowMenu(true) } className="cursor-pointer md:hidden" />
                {/* <h2 className="text-lg font-semibold">Dashboard</h2> */}
            </div>

            <div className="flex items-center gap-6">
                <UploadVideo 
                trigger={
                    <button className="bg-blue-600 p-2 rounded-full px-4 text-sm font-semibold cursor-pointer flex items-center gap-3">
                    <Upload className='w-5 h-5' />
                    <p>Subir Video</p>
                </button>
                }
                />
                
                <Search className="cursor-pointer w-5 h-5" />
                <Bell className="cursor-pointer w-5 h-5" />
                <button className="w-9 h-9 bg-[#474747] rounded-full flex items-center justify-center cursor-pointer">
                    <p>S</p>
                </button>
            </div>
        </div>
    )
}
