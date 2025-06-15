import { Search } from "lucide-react"
import { useVideoStore } from "../../store/useVideoStore"
import { useEffect, useState } from "react"
import { VideoList } from "./components/VideoList"

export const VideoPage = () => {

  const { videos, fetchVideos, isFetchingVideos } = useVideoStore()
  const [query, setQuery] = useState("")

  const filteredArr = query 
  ? videos.filter( video => video.playerId.nombre.toLowerCase().includes(query.toLowerCase()) )  
  : videos

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
          <input onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Buscar" className="outline-0 font-thin w-full" />
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        {isFetchingVideos ? (
          <p>Obteniendo Videos...</p>

        ) : videos.length > 0 ? (
          <VideoList videos={filteredArr} />
          
        ) : (
          <p>No hay videos disponibles.</p>
        )}

      </div>
    </div>
  )
}
