import { Check, CircleX, Clock, Search } from "lucide-react"
import { useVideoStore } from "../../store/useVideoStore"
import { useEffect, useState } from "react"
import { VideoList } from "./components/VideoList"

export const VideoPage = () => {

  const { videos, fetchVideos, isFetchingVideos } = useVideoStore()
  const [query, setQuery] = useState("")

  const filteredArr = query
    ? videos.filter(video => video.playerId.nombre.toLowerCase().includes(query.toLowerCase()))
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

      {isFetchingVideos ? (
        <div className="mt-8">
          <p>Obteniendo Videos...</p>
        </div>

      ) : videos.length > 0 ? (

        <>
          {/* indicators */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <div className="w-full bg-[#16A34A] text-white flex items-center justify-between rounded-lg p-6 px-8 border border-green-500">
              <div className="flex flex-col items-start gap-1">
                <p className="font-light">Completado</p>
                <p className="text-2xl font-semibold">4</p>
              </div>
              <div>
                <Check />
              </div>
            </div>
            <div className="bg-[#CA8A04] text-white flex items-center justify-between rounded-lg p-6 px-8 border border-orange-500 w-full">
              <div className="flex flex-col items-start gap-1">
                <p className="font-light">Procesando</p>
                <p className="text-2xl font-semibold">1</p>
              </div>
              <div>
                <Clock />
              </div>
            </div>
            <div className="bg-[#DC2626] text-white flex items-center justify-between rounded-lg p-6 px-8 border border-rose-500 w-full">
              <div className="flex flex-col items-start gap-1">
                <p className="font-light">Fallos</p>
                <p className="text-2xl font-semibold">1</p>
              </div>
              <div>
                <CircleX />
              </div>
            </div>
          </div>

          <div className="mt-8 mb-10">
            <VideoList videos={filteredArr} />
          </div>

        </>

      ) : (
        <p>No hay videos disponibles.</p>
      )}

    </div>
  )
}
