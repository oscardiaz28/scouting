import { Upload, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePlayerStore } from "../../store/usePlayerStore"
import { useForm } from "react-hook-form"
import { axiosInstance } from "../../lib/axios"
import toast from "react-hot-toast"

interface Props{
    showModal: boolean,
    setShowModal: (value: boolean) => void
}

export const UploadVideo = ( { setShowModal} : Props ) => {

    const { register, handleSubmit, formState: {errors} } = useForm()

    const [analyzing, setAnalyzing] = useState(false)
    const navigate = useNavigate();
    const {players, fetchAllPlayers} = usePlayerStore()
    
    console.log(players)

    const startAnalyze = async (data: any) => {
        setAnalyzing(true)
        try{
            const resp = await axiosInstance.post("/videos", data)
            const videoId = resp.data._id
            const url = `/dashboard/videos/${videoId}`
            navigate(url)
        }catch(err){
            toast.error("No se ha podido subir el video")
        }finally{
            setAnalyzing(false)
        }
    }

    const onSubmit = (data: any) => {
        const formData = new FormData()
        formData.append("video", data.video[0])
        formData.append("playerId", data.playerId)
        formData.append("nombre", data.nombre)
        formData.append("descripcion", data.descripcion)
        formData.append("fecha", new Date().toISOString())

        startAnalyze(formData)
    }

    useEffect(() => {
        fetchAllPlayers()
    }, [])

  return (
    <>  
        
        { (!analyzing ) && (
            <div className="absolute modal-overlay z-50">
                <form onSubmit={handleSubmit(onSubmit)} className="modal-container max-w-lg p-6 px-8 relative flex flex-col gap-6">

                    <div className="">
                        <button type="button" onClick={ () => setShowModal(false) } className="absolute top-4 right-4" >
                            <X className="w-5 h-5 cursor-pointer" />
                        </button>
                        <h2 className="flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            <span className="text-lg font-semibold">Analizar Video</span>
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">Sube tu contenido de vídeo para un análisis inteligente</p>
                    </div>

                    <div className="">
                        <h2 className="mb-3">Selecciona al jugador</h2>
                        <div className="flex gap-2">
                            <select 
                            {...register('playerId', {required: "Selecciona un jugador"})}
                            name="playerId" id="" className="flex-1 bg-[#070708] border-1 border-gray-700 appearance-none p-2 rounded-md text-base focus:outline-0 focus:border-1 focus:border-gray-700">
                                <option value="">Selecciona a un jugador</option>
                                {players.map( player => (
                                    <option key={player._id} value={player._id}>
                                        {player.nombre} {player.apellido}
                                    </option>
                                ) )}
                            </select>
                        </div>
                        {errors.playerId && 
                            <span className="text-sm text-rose-500">{errors.playerId.message?.toString()}
                            </span>}
                    </div>

                    <div className="">
                        <h2 className="mb-3">Nombre del video</h2>
                        <div className=" gap-2">
                            <input 
                            type="text"
                            {...register('nombre', {required: "El nombre es requerido"})}
                            name="nombre" id="nombre" 
                            className="appearance-none border-1 border-gray-700 rounded-md p-2 px-3 focus:outline-0 focus:border-1 w-full "
                            placeholder="Ingresa un nombre para el video" />
                        </div>
                        {errors.nombre && 
                            <span className="text-sm text-rose-500">{errors.nombre.message?.toString()}
                            </span>}
                    </div>

                    <div className="">
                        <h2 className="mb-3">Descripcion del Video</h2>
                        <div className=" gap-2">
                            <textarea 
                            {...register('descripcion', {required: "La descripción es obligatoria"})}
                            name="descripcion" id="" 
                            className="appearance-none border-1 border-gray-700 rounded-md p-3 focus:outline-0 focus:border-1 w-full min-h-[110px]"
                            placeholder="Ingresa una descripcion para el video"></textarea>
                        </div>
                        {errors.descripcion && 
                            <span className="text-sm text-rose-500">{errors.descripcion.message?.toString()}
                            </span>}
                    </div>

                    <div className="">
                        <h2 className="mb-3">Subir Video</h2>
                        <div className="2">
                            <input 
                            {...register("video", {required: "El video es requerido"})}
                            name="video"
                            type="file" className="appearance-none border-1 border-gray-700 rounded-md p-3 focus:outline-0 focus:border-1 w-full"
                            placeholder="Ingresa una descripcion para el video" />
                        </div>
                        {errors.video && 
                            <span className="text-sm text-rose-500">{errors.video.message?.toString()}
                            </span>}
                    </div>

                    <div className="flex justify-end gap-4">
                        <button type="button" 
                        className="flex bg-[#1A1C1E] items-center justify-center gap-2 rounded-md p-2 px-3 cursor-pointer"
                        onClick={ () => setShowModal(false) }
                        >Cancelar</button>

                        <button type="submit"
                        className="flex bg-emerald-700 items-center justify-center gap-2 rounded-md p-2 px-3 cursor-pointer hover:bg-emerald-600"
                        
                        >Analizar</button>
                    </div>

                </form>
            </div>
        ) }

       { (analyzing) && (
         <div className="absolute modal-overlay z-50">
            <div className="modal-container max-w-lg p-6 px-8 relative flex flex-col gap-7">

                <div className="">
                    <button type="button" onClick={ () => setShowModal(false) } className="absolute top-4 right-4" >
                        <X className="w-5 h-5 cursor-pointer" />
                    </button>
                    <h2 className="flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        <span className="text-lg font-semibold">Analizar Video</span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">Sube tu contenido de vídeo para un análisis inteligente</p>
                </div>

                <div className="min-h-[200px] flex items-center justify-center">
                    <div className="text-center flex flex-col items-center max-w-xs">
                        {/* <div className="loader"></div> */}
                        {/* <img src={"/videos/gif.gif"} alt="" className="infinite-loop" /> */}
                        <h3 className="text-lg font-bold mb-3">Analizando tu Video</h3>
                        <p className="text-gray-400 text-sm">Nuestra IA está procesando tu video para extraer información valiosa. Esto puede tardar un momento.</p>
                    </div>
                </div>

            </div>
        </div>

       )}

    </>
  )

}
