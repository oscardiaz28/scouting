import { Check, Search } from "lucide-react"
import { useVideoStore } from "../../store/useVideoStore"
import { useEffect, useState } from "react"
import { VideoList } from "./components/VideoList"

export const VideoPage = () => {

  const { videos, fetchVideos, isFetchingVideos, indicators } = useVideoStore()
  const [query, setQuery] = useState("")

  console.log(indicators)

  const filteredArr = query
    ? videos.filter(video => video.nombre.toLowerCase().includes(query.toLowerCase()))
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
          <div className="mt-6 flex flex-col gap-4 md:flex-row">

          {/* indicators */}
          {indicators.map( (indicator, idx) => {
            const names : any = {
              completed: {
                name: "Completado",
                color: "border-green-500 bg-[#16A34A]"
              },
              pending: {
                name: "Procesando",
                color: "bg-[#CA8A04] border-orange-500"
              },
              failed: {
                name: "Fallos",
                color: "bg-[#DC2626] border-rose-500"
              }
            }
            return (
              <div key={idx} className={`w-full text-white flex items-center justify-between rounded-lg p-6 px-8 border ${names[indicator.state].color}`}>
                <div className="flex flex-col items-start gap-1">
                  <p className="font-light">{names[indicator.state].name}</p>
                  <p className="text-2xl font-semibold">{indicator.count}</p>
                </div>
                <div>
                  <Check />
                </div>
              </div>
            )
          } )}
          </div>

          <div className="mt-8 mb-10 flex flex-col gap-4">
            <VideoList videos={filteredArr} />
          </div>

        </>

      ) : (
        <p className="mt-8">No hay videos disponibles.</p>
      )}

    </div>
  )
}
