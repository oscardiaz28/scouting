import { Check, RefreshCw, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { useVideoStore } from "../../store/useVideoStore"
import { useEffect } from "react"
import { formatterDate } from "../../utils/utils"

export const VideoPage = () => {

  const { videos, fetchVideos } = useVideoStore()

  console.log(videos)

  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <div className="">

        <div className="mb-10">
          <h2 className="font-bold text-2xl pb-1">Videos</h2>
          <p className="text-gray-400">Administra y analizar los videos de los jugadores</p>
        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 p-2 px-3 rounded-md border-1 border-gray-700 w-full max-w-[320px]">
            <Search className="w-5 h-5 text-gray-300" />
            <input type="text" placeholder="Buscar" className="outline-0 font-thin w-full" />
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {videos.map( video => (
            <div key={video.videoId._id} className="overflow-hidden rounded-md border-1 border-gray-600 shadow-md">
              <video src={video.videoId.url_video} ></video>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Link to={"/dashboard/videos/"+video.videoId._id} className="hover:underline">{video.videoId.descripcion}</Link>
                  <p className="text-sm text-gray-300">{formatterDate(video.videoId.fecha)}</p>
                </div>
                <div>
                  <p className="bg-[#2266C5] inline-block rounded-full p-1 px-3 text-sm">{video.playerId.nombre} {video.playerId.apellido}</p>
                </div>
              </div>
            </div>
          ) )}
        </div>
    </div>
  )
}
