import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/useAuthStore"

export const Logo = ( {size = "text-2xl" } : {size?: string} ) => {
    const { authUser } = useAuthStore()
    const navigate = useNavigate()

    return (
        <div className="cursor-pointer" onClick={ () =>{
            if(!authUser){
                navigate("/")
            }else{
                navigate("/dashboard")
            }
        } }>
            <h1 className={` font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text 
                ${size}`}>FutbolApp</h1>
        </div>
    )
}
