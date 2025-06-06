import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface Props{
  showMenu: boolean,
  setShowMenu: Dispatch<SetStateAction<boolean>>
}

const SidebarContext = createContext<Props | null>(null)

export const SidebarProvider = ( {children} : {children : ReactNode} ) => {

  const [showMenu, setShowMenu] = useState(false)

  return (
    <SidebarContext.Provider value={ {showMenu, setShowMenu}}>
        {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarState = () => {
  return useContext(SidebarContext)!
}