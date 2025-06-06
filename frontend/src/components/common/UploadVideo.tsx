import { Circle, Plus, Upload, X } from "lucide-react"
import { ReactNode, useState } from "react"
import { useNavigate } from "react-router-dom"

interface Props{
    trigger: ReactNode
}

export const UploadVideo = ( {trigger} : Props ) => {

    const [open, setOpen] = useState(false)
    const [analyzing, setAnalyzing] = useState(false)
    const navigate = useNavigate();

    const startAnalyze = () => {
        setAnalyzing(true)
        setTimeout(() => {
            setOpen(false)
            setAnalyzing(false)
            navigate("/dashboard/videos/dfe3246")
        }, 3000);
    }

  return (
    <>  
        <div onClick={ () => setOpen(true) }>
            {trigger}
        </div>
        { (open && !analyzing ) && (
            <div className="absolute modal-overlay z-50">
                <div className="modal-container p-6 px-8 relative flex flex-col gap-6">

                    <div className="">
                        <button type="button" onClick={ () => setOpen(false) } className="absolute top-4 right-4" >
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
                            <select name="" id="" className="flex-1 bg-[#070708] border-1 border-gray-700 appearance-none p-2 rounded-md text-base focus:outline-0 focus:border-1 focus:border-gray-700">
                                <option value="">Selecciona a un jugador</option>
                                <option value="">John Doe</option>
                                <option value="">Pedro Gomez</option>
                            </select>
                            <button className="flex bg-[#1A1C1E] items-center justify-center gap-2 rounded-md px-3 cursor-pointer">
                                <Plus />
                                <p>Agregar</p>
                            </button>
                        </div>
                    </div>

                    <div className="">
                        <h2 className="mb-3">Descripcion del Video (opcional)</h2>
                        <div className=" gap-2">
                            <textarea name="" id="" 
                            className="appearance-none border-1 border-gray-700 rounded-md p-3 focus:outline-0 focus:border-1 w-full min-h-[110px]"
                            placeholder="Ingresa una descripcion para el video"></textarea>
                        </div>
                    </div>

                    <div className="">
                        <h2 className="mb-3">Subir Video</h2>
                        <div className="2">
                            <input type="file" className="appearance-none border-1 border-gray-700 rounded-md p-3 focus:outline-0 focus:border-1 w-full"
                            placeholder="Ingresa una descripcion para el video" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button type="button" 
                        className="flex bg-[#1A1C1E] items-center justify-center gap-2 rounded-md p-2 px-3 cursor-pointer"
                        onClick={ () => setOpen(false) }
                        >Cancelar</button>
                        <button type="button"
                        className="flex bg-emerald-700 items-center justify-center gap-2 rounded-md p-2 px-3 cursor-pointer hover:bg-emerald-600"
                        onClick={ () => {
                            startAnalyze()
                        } }
                        >Analizar</button>
                    </div>

                </div>
            </div>
        ) }

       { (analyzing && open ) && (
         <div className="absolute modal-overlay z-50">
            <div className="modal-container p-6 px-8 relative flex flex-col gap-7">

                <div className="">
                    <button type="button" onClick={ () => setOpen(false) } className="absolute top-4 right-4" >
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
