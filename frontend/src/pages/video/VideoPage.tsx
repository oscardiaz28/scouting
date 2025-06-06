import { Check, RefreshCw, Search } from "lucide-react"
import { Link } from "react-router-dom"

const videos = [
  {
    description: "Entrenamiento realizado ayer",
    fecha: "17 Abril, 2025",
    player: "John Doe",
    state: "in-process"
  },
  {
    description: "Partido de practica con Chelsea FC",
    fecha: "10 Abril, 2025",
    player: "Pedro Gomez",
    state: "in-completed"
  }
]

export const VideoPage = () => {


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
            <div className="overflow-hidden rounded-md border-1 border-gray-600 shadow-md">
              <video src="/videos/train.mp4" ></video>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Link to={"/dashboard/videos/23422"} className="hover:underline">{video.description}</Link>
                  <p className="text-sm text-gray-300">{video.fecha}</p>
                </div>

                <div className="flex items-center justify-between">
                  <Link to={"/dashboard/players/1231451"} className="inline-block p-1 px-3 text-sm bg-[#2266c5] rounded-full hover:bg-[#2266c5d6]">{video.player}</Link>
                  {video.state == "in-process" ? (
                      <div className="rounded-full bg-[#FFFAC6] 
                      flex items-center gap-2
                      text-xs font-semibold text-[#915700] p-1 px-3">
                        <RefreshCw className="w-3 h-3" />
                        En Proceso
                      </div>
                  ) : (
                      <div className="rounded-full bg-[#CCFCF2] 
                      flex items-center gap-2
                      text-xs font-semibold text-[#076E5D] p-1 px-3">
                        <Check className="w-3 h-3" />
                        Completado
                      </div>
                  ) }
                </div>

              </div>
            </div>
          ) )}

        </div>

    </div>
  )
}
