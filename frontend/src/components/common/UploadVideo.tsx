import { FileVideo, Upload, UploadIcon,  X } from "lucide-react"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePlayerStore } from "../../store/usePlayerStore"
import { useForm } from "react-hook-form"
import { axiosInstance } from "../../lib/axios"
import toast from "react-hot-toast"
import { useToast } from "../../context/ToastContext"
import { formatBytesToMB } from "../../lib/utils"

interface Props {
    showModal: boolean,
    setShowModal: (value: boolean) => void
}

export const UploadVideo = ({ setShowModal }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isDropping, setIsDropping] = useState(false)

    const [analyzing, setAnalyzing] = useState(false)
    const navigate = useNavigate();
    const { players, fetchAllPlayers } = usePlayerStore()
    const [showRequirements, setShowRequirements] = useState(true);
    const [videoFile, setVideoFile] = useState<File | null>(null)

    const inputRef = useRef<HTMLInputElement>(null);
    const {showToast} = useToast();


    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDropping(true)
    }

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDropping(false)
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDropping(false)
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
            const msg = validateFile(droppedFile)
            if(msg){
                showToast(msg, "error")
                return;
            }
            setVideoFile(droppedFile)
        }
    }


    const startAnalyze = async (data: any) => {
        setAnalyzing(true)
        try {
            const resp = await axiosInstance.post("/videos", data)
            const videoId = resp.data._id
            const url = `/dashboard/videos/${videoId}`
            navigate(url)
        } catch (err) {
            toast.error("No se ha podido subir el video")
        } finally {
            setAnalyzing(false)
        }
    }

    const onSubmit = (data: any) => {
        if(!videoFile){
            showToast("El video es requerido", "error")
            return;
        }
        const formData = new FormData()
        formData.append("video", videoFile)
        formData.append("playerId", data.playerId)
        formData.append("nombre", data.nombre)
        formData.append("descripcion", data.descripcion)
        formData.append("fecha", new Date(data.date).toISOString())
        startAnalyze(formData)
    }

    const allowedTypes = ["video/mp4", "video/mov", "video/avi"];
    const maxSize = 5 * 1024 * 1024 * 1024

    const validateFile = (file : File) => {
        if(!allowedTypes.includes(file.type)){
            return "Por favor, cargue un archivo de vídeo válido (MP4, MOV o AVI)"
        }
        if(file.size > maxSize){
            return "El tamaño del archivo debe ser inferior a 5 GB"
        }
        return null;
    }


    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const selectedFile = input.files?.[0]
        console.log(selectedFile)
        if (selectedFile) {
            const msg = validateFile(selectedFile)
            if(msg){
                showToast(msg, "error")
                return;
            }
            setVideoFile(selectedFile)
        }
    }


    useEffect(() => {
        fetchAllPlayers()
    }, [])

    return (
        <>
            {showRequirements && (
                <div className="absolute modal-overlay z-50">
                    <div className="modal-container w-full max-w-lg p-6 px-8 relative">

                        <div className="">
                            <button type="button" onClick={() => {
                                setShowRequirements(false)
                                setShowModal(false)
                            }} className="absolute top-4 right-4" >
                                <X className="w-5 h-5 cursor-pointer" />
                            </button>
                            <h2 className="flex items-center gap-3">
                                <Upload className="w-5 h-5 text-[#3B82F6]" />
                                <span className="text-lg font-semibold">Requisitos para subir video</span>
                            </h2>
                            <p className="text-sm text-gray-400 mt-2">Asegúrese de que su video cumpla con los siguientes requisitos antes de cargarlo</p>
                        </div>

                        {/* requirements */}
                        <div className="mt-10 flex flex-col gap-5">
                            <div className="flex items-start gap-4">
                                <div className="w-[9px] h-[9px] rounded-full bg-[#22C55E] mt-2"></div>
                                <div className="">
                                    <p className="font-semibold">Calidad de Vídeo</p>
                                    <p className="text-white/60 text-sm">Resolución minima de 720p para un seguimiento preciso del jugador</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-[9px] h-[9px] rounded-full bg-[#3B82F6] mt-2"></div>
                                <div className="">
                                    <p className="font-semibold">Formato de Archivo</p>
                                    <p className="text-white/60 text-sm">Formatos compatibles: MP4, MOV, AVI (Max 5gb)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-[9px] h-[9px] rounded-full bg-[#A855F7] mt-2"></div>
                                <div className="">
                                    <p className="font-semibold">Pautas de Contenido</p>
                                    <p className="text-white/60 text-sm">Visión clara del campo, el jugador objetivo debe usar la pulsera de seguimiento</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-[9px] h-[9px] rounded-full bg-[#EAB308] mt-2"></div>
                                <div className="">
                                    <p className="font-semibold">Duración</p>
                                    <p className="text-white/60 text-sm">
                                        Entre 5 minutos y 2 horas para un procesamiento óptimo
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-9">
                            <button className="p-2 px-4 rounded-md border border-gray-700 text-white bg-[#020817] cursor-pointer hover:bg-[#334155]"
                                onClick={() => {
                                    setShowModal(false)
                                    setShowRequirements(false)
                                }}
                            >
                                Cancelar
                            </button>
                            <button className="p-2 px-4 rounded-md border border-green-600 text-white bg-[#16A34A] cursor-pointer hover:bg-[#15803D]"
                                onClick={() => setShowRequirements(false)}
                            >
                                Entiendo, continuar
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {(!analyzing && !showRequirements) && (
                <div className="absolute modal-overlay z-50">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        if(!videoFile) showToast("El video es requerido", "error")
                        handleSubmit(onSubmit)()
                    } } className="modal-container w-full max-w-screen-md p-6 px-8 relative flex flex-col gap-6">

                        <div className="">
                            <button type="button" onClick={() => setShowModal(false)} className="absolute top-4 right-4" >
                                <X className="w-5 h-5 cursor-pointer" />
                            </button>
                            <h2 className="flex items-center gap-2">
                                <Upload className="w-5 h-5" />
                                <span className="text-lg font-semibold">Analizar Video</span>
                            </h2>
                            <p className="text-sm text-gray-400 mt-1">Sube tu contenido de vídeo para un análisis inteligente</p>
                        </div>

                        <div className="flex flex-col gap-4">

                            <div onDrop={handleDrop} onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                className={`border-2 border-dashed p-4 rounded-lg 
                            ${isDropping ? "border-blue-600 bg-blue-600/15" : "border-gray-600 bg-none"}`}>

                                <input type="file" id="image-upload" className="hidden" ref={inputRef}
                                    onChange={handleImageChange}
                                />

                                {!videoFile ? (
                                    <>
                                        <div className="flex items-center justify-center flex-col py-2 gap-3">
                                            <UploadIcon size={45} className="text-[#64748B]" />
                                            <div className="text-center">
                                                <p className="font-semibold">Deja tu video aqui</p>
                                                <p className="text-[#94A3B8] text-sm">o haga click para elegir el archivo</p>
                                            </div>
                                            <button type="button"
                                            onClick={ () => inputRef.current?.click() }
                                            className="bg-[#020817] block p-[10px] rounded-md px-4 cursor-pointer w-max border border-gray-600 hover:bg-[#334155] text-sm">
                                                Elegir Archivo
                                            </button>
                                        </div>
                                    </>
                                )  : (
                                    <div className="flex flex-col items-center justify-center py-3 gap-3">   
                                        <FileVideo className="text-[#22C55E] w-12 h-12" />
                                        <div className="flex flex-col text-center">
                                            <p className="font-semibold">{videoFile.name}</p>
                                            <p className="text-[#94A3B8]">{formatBytesToMB(videoFile.size)}</p>
                                        </div>
                                        <button type="button"
                                        className="p-2 px-4 rounded-md border border-gray-700 text-white bg-[#020817] cursor-pointer hover:bg-[#334155]"
                                        onClick={ () => {
                                            setVideoFile(null)
                                        } }
                                        >
                                            Quitar
                                        </button>
                                    </div>
                                ) }
                               

                            </div>

                            <div className="space-y-5">
                                <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
                                    <div className="w-full md:w-[70%]">
                                        <h2 className="mb-3">Selecciona al jugador</h2>
                                        <div className="flex gap-2">
                                            <select
                                                {...register('playerId', { required: "Selecciona un jugador" })}
                                                name="playerId" id="" className="flex-1 bg-[#334155] border-1 border-gray-600 appearance-none p-2 px-4 rounded-md text-base focus:outline-0 focus:border-1 focus:border-gray-700">
                                                <option value="">Selecciona a un jugador</option>
                                                {players.map(player => (
                                                    <option key={player._id} value={player._id}>
                                                        {player.nombre} {player.apellido}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.playerId &&
                                            <span className="text-sm text-rose-500">{errors.playerId.message?.toString()}
                                            </span>}
                                    </div>
                                    <div className="w-full md:w-[30%]">
                                        <h3 className="mb-3" >Fecha</h3>
                                        <input type="date" id="date" 
                                        {...register("date", {required: "La fecha es requerida"} )}
                                        name="date"
                                        className="appearance-none bg-[#334155] border-1 border-gray-600 rounded-md p-2 px-3 focus:outline-0 focus:border-1 w-full "
                                        />
                                        {errors.date &&
                                        <span className="text-sm text-rose-500">{errors.date.message?.toString()}
                                        </span>}
                                    </div>
                                </div>

                                <div className="">
                                    <h2 className="mb-3">Nombre del video</h2>
                                    <div className=" gap-2">
                                        <input
                                            type="text"
                                            {...register('nombre', { required: "El nombre es requerido" })}
                                            name="nombre" id="nombre"
                                            className="appearance-none bg-[#334155] border-1 border-gray-600 rounded-md p-2 px-3 focus:outline-0 focus:border-1 w-full "
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
                                            {...register('descripcion', { required: "La descripción es obligatoria" })}
                                            name="descripcion" id=""
                                            className="appearance-none bg-[#334155] border-1 border-gray-600 rounded-md p-3 focus:outline-0 focus:border-1 w-full min-h-[90px]"
                                            placeholder="Ingresa una descripcion para el video"></textarea>
                                    </div>
                                    {errors.descripcion &&
                                        <span className="text-sm text-rose-500">{errors.descripcion.message?.toString()}
                                        </span>}
                                </div>

                                <div className="flex justify-end gap-4 mt-5">
                                    <button type="button"
                                        className="p-2 px-4 rounded-md border border-gray-700 text-white bg-[#020817] cursor-pointer hover:bg-[#334155]"
                                        onClick={() => setShowModal(false)}
                                    >Cancelar</button>

                                    <button 
                                    type="submit"
                                        className="p-2 px-4 rounded-md border border-green-600 text-white bg-[#16A34A] cursor-pointer hover:bg-[#15803D]"

                                    >Analizar</button>
                                </div>
                            </div>

                        </div>

                    </form>
                </div>
            )}

            {(analyzing && !showRequirements) && (
                <div className="absolute modal-overlay z-50">
                    <div className="modal-container max-w-lg p-6 px-8 relative flex flex-col gap-7">

                        <div className="">
                            <button type="button" onClick={() => setShowModal(false)} className="absolute top-4 right-4" >
                                <X className="w-5 h-5 cursor-pointer" />
                            </button>
                            <h2 className="flex items-center gap-2">
                                <Upload className="w-5 h-5 text-[#3B82F6]" />
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
