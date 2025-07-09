import { formatterDate } from "../../../utils/utils"
import { ChartColumnDecreasing, CircleCheckBig, Play, Target, Users, Zap } from "lucide-react"
import { MouseEventHandler } from "react"

export const VideoList = ({ videos }: { videos: any }) => {


    const handleDeleteVideo: MouseEventHandler<HTMLButtonElement> | undefined = (videoId: any) => {
        const result = confirm("¿Estas seguro de eliminar el video? ")
        if (result) {
            console.log(videoId)
        }
    }

    return videos.map((video: any) => (
        <div key={video.videoId._id} className="rounded-md border-1 order border-[#334155] shadow-md p-7 px-8 bg-[#1E293B]">
            {/* <video src={video.videoId.url_video} ></video> */}
            <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                    <Play className="text-green-500" size={22} />
                    <p className="text-lg font-semibold">{video.videoId.nombre}</p>
                </div>
                {/* <p className="bg-[#16A34A] p-1 px-4 rounded-full text-white text-xs">Completado</p> */}

                <div className="flex items-center gap-3 text-base ">
                    <CircleCheckBig className="text-green-500" size={20} />
                    <p className="text-gray-50/70">Analisis completado</p>
                </div>

            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400 mt-3">
                <p>{formatterDate(video.videoId.fecha)}</p>
                <p>500.00 MB</p>
                <p>30m 0s</p>
            </div>

            <div className="mt-6 ">
                <p className="text-base"><span className="font-semibold text-gray-50/60">Jugador: </span> {video.playerId.nombre} {video.playerId.apellido}</p>

                <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-[2px] items-center justify-center bg-[#334155] rounded-md p-4 border border-[#4b596a]">
                        <Users className="text-[#60A5FA]" />
                        <p className="text-base text-gray-50/60 font-light">Precisión de pase</p>
                        <p className="text-xl font-semibold">91%</p>
                    </div>

                    <div className="flex flex-col gap-[2px] items-center justify-center bg-[#334155] rounded-md p-4 border border-[#4b596a]">
                        <Target className="text-[#4ADE80]" />
                        <p className="text-base text-gray-50/60 font-light">Disparos</p>
                        <p className="text-xl font-semibold">5/8</p>
                    </div>

                    <div className="flex flex-col gap-[2px] items-center justify-center bg-[#334155] rounded-md p-4 border border-[#4b596a]">
                        <ChartColumnDecreasing className="text-[#C084FC]" />
                        <p className="text-base text-gray-50/60 font-light">Posesión</p>
                        <p className="text-xl font-semibold">91%</p>
                    </div>

                    <div className="flex flex-col gap-[2px] items-center justify-center bg-[#334155] rounded-md p-4 border border-[#4b596a]">
                        <Zap className="text-[#FACC15]" />
                        <p className="text-base text-gray-50/60 font-light">Top Speed</p>
                        <p className="text-xl font-semibold">24 km/h</p>
                    </div>
                </div>
            </div>

            {/* 
            <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <Link to={"/dashboard/videos/" + video.videoId._id} className="hover:underline">{video.videoId.nombre}</Link>
                    <p className="text-sm text-gray-300">{formatterDate(video.videoId.fecha)}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="bg-[#2266C5] inline-block rounded-full p-1 px-3 text-sm">{video.playerId.nombre} {video.playerId.apellido}</p>
                    <button
                        onClick={ () => handleDeleteVideo(video.videoId._id) }
                        className="w-7 h-7 flex items-center rounded-md justify-center bg-rose-500 cursor-pointer">
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>
                <div className="p-2 px-4 rounded-full text-sm text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400 w-max">
                    <span className="font-medium">Análisis completo</span>
                </div>
            </div>
             */}
        </div>
    )
    )
}