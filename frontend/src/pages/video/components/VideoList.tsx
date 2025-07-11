import { formatterBytes, formatterDate, formatterDuration } from "../../../utils/utils"
import { ChartColumnDecreasing, CircleCheckBig, CircleX, Clock, Play, RefreshCcw, RefreshCw, Target, Timer, Users, Zap } from "lucide-react"
import { MouseEventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SwipeItem } from "./SwipeItem"
import { axiosInstance } from "../../../lib/axios"
import toast from "react-hot-toast"
import { useVideoStore } from "../../../store/useVideoStore"
import { useToast } from "../../../context/ToastContext"

export const VideoList = ({ videos }: { videos: any }) => {

    const {deleteVideo} = useVideoStore()
    const { showToast } = useToast()

    const handleDeleteVideo: MouseEventHandler<HTMLButtonElement> | undefined = async (videoId: any) => {
        const result = confirm("¿Estas seguro de eliminar el video? ")
        if (result) {
            try{
                await deleteVideo(videoId)
                showToast("Video eliminado correctamente", "success")
            }catch(err: any){
                const {message} = err?.response?.data
                showToast(message, "error")
            }
        }
    }
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();

    const handleRetry = async (id: string) => {
        console.log(id)
        setShowModal(true)
        await new Promise((resolve) => setTimeout(() => {
            resolve("ok")
        }, 2000) )
        try{
            const resp = await axiosInstance.post(`/videos/retry/${id}`)
            const videoId: any = resp.data?.id
            const url = `/dashboard/videos/${videoId}`
            navigate(url)
            toast.success("Analisis hecho correctamente")
        }catch(err: any){
            toast.error(err.response.data.message)
        }finally{
            setShowModal(false)
        }
    }

    return videos.map( (video: any, idx: number) => (
        <div key={idx}>
            {showModal && (
                <div className="absolute z-40 bg-black/40 top-0 left-0 w-full min-h-screen flex items-center justify-center">
                    <div className="bg-[#1E293B] p-6 rounded-md border border-gray-600 w-full max-w-md">
                        <div className="w-full flex items-center justify-center">
                            <div className="w-12 h-12 bg-[#1C423E] rounded-full flex items-center justify-center">
                                <RefreshCcw className="text-[#22C55E]"  />
                            </div>
                        </div>
                        <div className="pt-6 flex flex-col gap-3 pb-6">
                            <p className="font-semibold text-[18px] text-center">Reintentado analisis de video</p>
                            <p className="text-white/50 text-sm text-center">La IA intentará analizar nuevamente el video, permitiendo obtener metricas claves del jugador</p>
                        </div>
                    </div>
                </div>
            )}
            <SwipeItem key={idx} onDelete={() => handleDeleteVideo(video._id)}>
                <div key={video._id} className="rounded-md border-1 order border-[#334155] shadow-md p-7 px-8 bg-[#1E293B] relative">

                    {/* <video src={video.videoId.url_video} ></video> */}
                    <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-3">
                            <Play className="text-green-500" size={22} />
                            {video.is_analyzed === "completed" ? (
                                <>
                                    <Link to={"/dashboard/videos/" + video._id}
                                        className="hover:underline"
                                    >
                                        <p className="text-lg font-semibold">{video.nombre}</p>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to={"/dashboard/videos/" + video._id}
                                        className="hover:underline"
                                    >
                                        <p className="text-lg font-semibold">{video.nombre}</p>
                                    </Link>
                                </>
                            )}
                        </div>
                        {/* <p className="bg-[#16A34A] p-1 px-4 rounded-full text-white text-xs">Completado</p> */}

                        <div className="flex items-center gap-3 text-base ">
                            {video.is_analyzed === "completed" && (
                                <>
                                    <CircleCheckBig className="text-green-500" size={20} />
                                    <p className="text-gray-50/70">Analisis completado</p>
                                </>
                            )}
                            {video.is_analyzed === "pending" && (
                                <>
                                    <Timer className="text-[#CA8A04]" size={20} />
                                    <p className="text-gray-50/70">Procesando</p>
                                </>
                            )}
                            {video.is_analyzed === "failed" && (
                                <>
                                    <CircleX className="text-[#DC2626] mt-[2px]" size={20} />
                                    <p className="text-gray-50/70">Error en el análisis</p>
                                </>
                            )}
                        </div>

                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-400 mt-3">
                        <p>{formatterDate(video.fecha)}</p>
                        <p>{formatterDuration(video.duration)}</p>
                        <p>{formatterBytes(video.size_bytes)}</p>
                    </div>

                    <div className="mt-6 ">
                        <p className="text-base"><span className="font-semibold text-gray-50/60">Jugador: </span> 
                        {video.playerId.nombre} {video.playerId.apellido}</p>
                        {video.is_analyzed === "pending" && (
                            <>
                                <div className="flex items-center gap-3 mt-6">
                                    <Clock className="text-[#CA8A04] animate-spin" size={18} />
                                    <p>Analizando video...</p>
                                </div>
                            </>
                        )}
                        {video.is_analyzed === "failed" && (
                            <>
                                <div className="flex items-center gap-3 mt-6">
                                    <CircleX className="text-rose-700" size={18} />
                                    <p>No se ha podido analizar su video, intentar más tarde</p>
                                </div>
                                <button className="bg-[#020817] border border-green-500 p-2 px-4 text-[#4ADE80] flex items-center gap-3 rounded-md mt-5 hover:bg-[#16A34A] hover:text-white cursor-pointer font-semibold"
                                onClick={ () => handleRetry(video._id) }
                                >
                                    <RefreshCw className="border-green-700" size={17} />
                                    Reintentar Análisis
                                </button>
                            </>
                        )}
                        {video.is_analyzed === "completed" && (
                            <>
                                <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                                    <div className="flex flex-col gap-[2px] items-center justify-center bg-[#334155] rounded-md p-4 border border-[#4b596a]">
                                        <Users className="text-[#60A5FA]" />
                                        <p className="text-base text-gray-50/60 font-light">Pases Completados</p>
                                        <p className="text-xl font-semibold">{video.stats[0].pasesCompletados}</p>
                                    </div>

                                    <div className="flex flex-col gap-[2px] items-center justify-center bg-[#334155] rounded-md p-4 border border-[#4b596a]">
                                        <Target className="text-[#4ADE80]" />
                                        <p className="text-base text-gray-50/60 font-light">Regates</p>
                                        <p className="text-xl font-semibold">{video.stats[0].regates}</p>
                                    </div>

                                    <div className="flex flex-col gap-[2px] items-center justify-center bg-[#334155] rounded-md p-4 border border-[#4b596a]">
                                        <ChartColumnDecreasing className="text-[#C084FC]" />
                                        <p className="text-base text-gray-50/60 font-light">Control Balón</p>
                                        <p className="text-xl font-semibold">{video.stats[0].control_balon}%</p>
                                    </div>

                                    <div className="flex flex-col gap-[2px] items-center justify-center bg-[#334155] rounded-md p-4 border border-[#4b596a]">
                                        <Zap className="text-[#FACC15]" />
                                        <p className="text-base text-gray-50/60 font-light">Velocidad</p>
                                        <p className="text-xl font-semibold">{video.stats[0].speed_max} km/h</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </SwipeItem>
        </div>
    )

    )
}