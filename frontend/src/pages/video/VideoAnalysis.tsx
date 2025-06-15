import { Share } from "lucide-react"
import { useEffect, useState } from "react"
import { Cell, Legend, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip} from "recharts"
import { axiosInstance } from "../../lib/axios";
import { Link, useParams } from "react-router-dom";
import { capitalize, formatterDate } from "../../utils/utils";
import { StatBarChart } from "./components/StatBarChart";
import { StatPasesPieChart } from "./components/StatPasesPieChart";
import { ProgressBarAttribute } from "./components/ProgressBarAttribute";
import toast from "react-hot-toast";


interface RadarStats {
  tecnica: number;
  resistencia: number;
  fuerza: number;
  visionJuego: number;
  velocidad: number
}

interface DistribucionPases {
  cortos: number,
  largos: number,
  filtrados: number,
  centros: number
}

interface Distribucion {
  [key: string]: number
}

interface PlayerInfo{
  _id: string,
  nombre: string,
  apellido: string
}

interface VideoInfo{
  _id: string
  nombre: string,
  descripcion: string,
  url_video: string,
  fecha: string
}

interface Stat {
  videoId: VideoInfo,
  playerId: PlayerInfo,
  pasesCompletados: number;
  regates: number;
  tiros: number;
  intercepciones: number;
  faltasCometidas: number;
  asistencias: number;
  goles: number;
  duelosGanados: number;
  recuperaciones: number;
  radar: RadarStats,
  speed_max: number;
  distancia_recorrida: number;
  sprints: number;
  distribucionPases: DistribucionPases,
  distribucionTiros: Distribucion,
  resistencia: number,
  salto: number,
  agresividad: number,
  centros: number,
  definicion: number,
  control_balon: number,
  agilidad: number
}

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const tirosLabels: Record<string, string> = {
  dentroArea: "Dentro del Area",
  fueraArea: "Fuera del Area",
  cabeza: "De Cabeza",
  pieIzquierdo: "Pie Izquierdo",
  pieDerecho: "Pie Derecho"
}

export const VideoAnalysis = () => {

  const { id } = useParams<{ id: string }>()
  const [stats, setStats] = useState<Stat | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resp = await axiosInstance.get(`/videos/${id}`)
        console.log(resp.data)
        setStats(resp.data)
      } catch (err) {
        toast.error("No se ha encontrado el video")
        setStats(null)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [id])

  const handleShareVideoStats = () => {
    const currentUrl = window.location.href
    navigator.clipboard.writeText(currentUrl)
    .then(() => {
      toast.success("Enlace para compartir estadisticas copiado")
    })
    .catch(() => {
      toast.error("No se ha podido copiar en enlace")
    })
  }

  if (loading) {
    return <h1>Loading</h1>
  }

  if(stats == null){
    return (
      <h1>No se ha encontrado el video</h1>
    )
  }

  return (
    <div className="">

      <div className="mt-4 flex flex-row items-end justify-between gap-2">
        <div>
          <p className="text-2xl font-semibold text-gray-300">{stats?.videoId.nombre}</p>
          <p className="text-gray-300 text-md font-semibold mt-2 mb-3">{stats?.videoId.descripcion}</p>
          <div>
            <p className="text-md text-gray-500">{formatterDate(stats!.videoId!.fecha)}</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="font-base text-gray-400 text-md">Jugador: </span>
          <Link className="text-md font-semibold" to={`/dashboard/players/${stats?.playerId._id}`}>
            {stats?.playerId.nombre} {stats?.playerId.apellido}
          </Link>
        </div>
      </div>

      <div className="rounded-md flex justify-between mt-8">
        <div 
        onClick={handleShareVideoStats}
        className="rounded-md justify-start cursor-pointer flex items-center gap-4">
          <Share />
          <p>Compartir Estadísticias</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[3fr_2fr] mt-8 gap-6">

        {/* left */}
        <div className="grid grid-cols-1 gap-6">

          {/* video */}
          <div className="overflow-hidden rounded-lg border border-gray-800">
            <video src="/videos/train.mp4" muted={true} controls className="w-full"></video>
          </div>

          <div className="bg-[#1A1C1E] p-4 px-5 rounded-md">
            <h3 className="text-xl font-bold mb-4 text-white">Atributos</h3>

            <div className="grid grid-cols-2 gap-10">

              {/* left */}
              <div className="flex flex-col gap-2">
                <ProgressBarAttribute title="Resistencia" value={stats!.resistencia} />
                <ProgressBarAttribute title="Salto" value={stats!.salto} />
                <ProgressBarAttribute title="Faltas Cometidas" value={stats!.faltasCometidas} />
                <ProgressBarAttribute title="Centros" value={stats!.centros} />
              </div>

              {/* right */}
              <div className="flex flex-col gap-2">
                <ProgressBarAttribute title="Definición" value={stats!.definicion} />
                <ProgressBarAttribute title="Control de balón" value={stats!.control_balon} />
                <ProgressBarAttribute title="Agilidad" value={stats!.agilidad} />
              </div>

            </div>

          </div>

          {/* bar chart */}
          <div className="p-4 bg-[#1A1C1E] rounded-md h-[350px]">
            <h3 className="text-xl font-bold mb-6 text-white">Acciones Realizadas</h3>
            {stats && <StatBarChart stats={stats} />}
          </div>

          {/* Pie Chart */}
          <div className="p-4 bg-[#1A1C1E] rounded-m h-[350px]">
            <h2 className="text-xl font-semibold mb-6 text-white">Distribución de Pases</h2>
            {stats?.distribucionPases && <StatPasesPieChart distribucionPases={stats.distribucionPases} />}
          </div>

        </div>

        {/* right */}
        <div className="flex flex-col gap-6">

          {/* radar chart */}
          <div className="bg-[#1A1C1E] p-6 rounded-md">
            <h1 className="text-xl font-bold text-white">Datos Obtenido</h1>
            <div className="mt-5 grid grid-cols-2">
              <div className="space-y-2 text-white/70 font-light">
                <p className="">Goles:</p>
                <p className="">Velocidad máxima:</p>
                <p className="">Distancia recorrida:</p>
                <p className="">Sprints:</p>
                <p className="">Duelos ganados:</p>
                <p className="">Asistencias:</p>
              </div>
              <div className="space-y-2">
                <p>{stats?.goles}</p>
                <p>{stats?.speed_max} km/h</p>
                <p>{stats?.distancia_recorrida} km</p>
                <p>{stats?.sprints}</p>
                <p>{stats?.duelosGanados}</p>
                <p>{stats?.asistencias}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1C1E] p-4 rounded-md">
            <div className="p-6 pt-0 h-[350px]">
              <h3 className="text-xl font-bold mb-4 text-white">Resultados</h3>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={
                  Object.entries(stats!.radar).map(([Key, value]) => ({ subject: capitalize(Key), A: value, fullMark: 100 }))
                }>
                  <PolarGrid stroke="#2A2E39" />
                  <PolarAngleAxis dataKey="subject"
                    stroke="#ffffff"
                    tick={{ fill: '#C4C4C4', fontSize: 14 }} />
                  <PolarRadiusAxis angle={90}
                    domain={[0, 100]}
                    stroke="#2A2E39"
                    tick={{ fill: '#444', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false} />
                  <Radar name="skills" dataKey="A" stroke="#20619E" fill="#21405D"
                    dot={{ stroke: '#00C8FF', strokeWidth: 2, r: 3 }}
                    fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* pie chart */}
          <div className="bg-[#1A1C1E] p-6 pt-4 rounded-md h-[350px]">
            <h2 className="text-xl font-semibold mb-6 text-white">Distribución de Tiros</h2>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart >
                <Pie
                  data={Object.entries(stats!.distribucionTiros).map(([Key, value]) => ({
                    name: tirosLabels[Key] || Key,
                    value
                  }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#00bcd4"
                >
                  {
                    Object.entries(stats!.distribucionTiros).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

    </div>
  )
}
