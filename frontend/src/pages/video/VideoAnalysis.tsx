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


export interface StatResponse {
  _id: string;
  nombre: string;
  descripcion: string;
  url_video: string;
  fecha: string; // ISO date string
  playerId: Player;
  is_analyzed: string;
  duration: number;
  size_bytes: number;
  stats: Stat[];
}

export interface Player {
  _id: string;
  nombre: string;
  apellido: string;
}

export interface Stat {
  _id: string;
  videoId: string;
  playerId: string;
  pasesCompletados: number;
  regates: number;
  intercepciones: number;
  faltasCometidas: number;
  asistencias: number;
  duelosGanados: number;
  recuperaciones: number;
  goles: number;
  resistencia: number;
  salto: number;
  agresividad: number;
  centros: number;
  definicion: number;
  control_balon: number;
  agilidad: number;
  radar: RadarStat;
  speed_max: number;
  distancia_recorrida: number;
  sprints: number;
  distribucionPases: DistribucionPases;
  distribucionTiros: DistribucionTiros;
  userId: string;
  tiros: number;
  __v: number;
}

export interface RadarStat {
  tecnica: number;
  fuerza: number;
  velocidad: number;
  regate: number;
  visionJuego: number;
}

export interface DistribucionPases {
  cortos: number;
  largos: number;
  filtrados: number;
  centros: number;
}

export interface DistribucionTiros {
  dentroArea: number;
  fueraArea: number;
  cabeza: number;
  pieIzquierdo: number;
  pieDerecho: number;
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
  const [data, setData] = useState<StatResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resp = await axiosInstance.get(`/videos/${id}`)

        setData(resp.data)
      } catch (err) {
        toast.error("No se ha encontrado el video")
        setData(null)
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

  if(data == null){
    return (
      <h1>No se ha encontrado el video</h1>
    )
  }

  return (
    <div className="">

      <div className="mt-4 flex flex-row items-end justify-between gap-2">
        <div>
          <p className="text-2xl font-semibold text-gray-300">{data.nombre}</p>
          <p className="text-gray-300 text-md font-semibold mt-2 mb-3">{data.descripcion}</p>
          <div>
            <p className="text-md text-gray-500">{formatterDate(data.fecha)}</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="font-base text-gray-400 text-md">Jugador: </span>
          <Link className="text-md font-semibold hover:underline" to={`/dashboard/players/${data?.playerId._id}`}>
            {data?.playerId.nombre} {data?.playerId.apellido}
          </Link>
        </div>
      </div>

      {data.stats.length !== 0 && (
        <div className="rounded-md flex justify-between mt-8">
          <div 
          onClick={handleShareVideoStats}
          className="rounded-md justify-start cursor-pointer flex items-center gap-4">
            <Share />
            <p>Compartir Estadísticias</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[3fr_2fr] mt-8 gap-6">

        {/* left */}
        <div className={`grid grid-cols-1 gap-6`}>

          {/* video */}
          <div className="overflow-hidden rounded-lg border border-gray-800">
            <video src="/videos/train.mp4" muted={true} controls className="w-full"></video>
          </div>
          

          { data.stats.length !== 0 && (
            <>
              <div className="bg-[#1E293B] p-4 px-5 rounded-md">
                    <h3 className="text-xl font-bold mb-4 text-white">Atributos</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                      {/* left */}
                      <div className="flex flex-col gap-2">
                        <ProgressBarAttribute title="Resistencia" value={data.stats[0].resistencia} />
                        <ProgressBarAttribute title="Salto" value={data.stats[0].salto} />
                        <ProgressBarAttribute title="Faltas Cometidas" value={data.stats[0].faltasCometidas} />
                        <ProgressBarAttribute title="Centros" value={data.stats[0].centros} />
                      </div>

                      {/* right */}
                      <div className="flex flex-col gap-2">
                        <ProgressBarAttribute title="Definición" value={data.stats[0].definicion} />
                        <ProgressBarAttribute title="Control de balón" value={data.stats[0].control_balon} />
                        <ProgressBarAttribute title="Agilidad" value={data.stats[0].agilidad} />
                      </div>

                    </div>

              </div>

              {/* bar chart */}
              <div className="p-4 bg-[#1E293B] rounded-md h-[350px]">
                <h3 className="text-xl font-bold mb-6 text-white">Acciones Realizadas</h3>
                {data && <StatBarChart stats={ 
                  {pasesCompletados: data.stats[0].pasesCompletados, regates: data.stats[0].regates, tiros: data.stats[0].tiros, intercepciones: data.stats[0].intercepciones } 
                  } />}
              </div>

              {/* Pie Chart */}
              <div className="p-4 bg-[#1E293B] rounded-m h-[350px]">
                <h2 className="text-xl font-semibold mb-6 text-white">Distribución de Pases</h2>
                {data.stats[0].distribucionPases && <StatPasesPieChart distribucionPases={data.stats[0].distribucionPases} />}
              </div>
          </>
          ) }

        </div>

        {data.stats.length !== 0 && (
          <>
            {/* right */}
            <div className="flex flex-col gap-6">

              {/* radar chart */}
              <div className="bg-[#1E293B] p-6 rounded-md">
                <h1 className="text-xl font-bold text-white">Datos Obtenido</h1>
                <div className="mt-5 grid grid-cols-1 gap-2">

                  <div className="flex items-center justify-between">
                    <p className="text-white/70 font-light flex-1">Goles:</p>
                    <p className="flex-1 text-right">{data.stats[0].goles}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-white/70 font-light flex-1">Velocidad máxima:</p>
                    <p className="flex-1 text-right">{data.stats[0].speed_max}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-white/70 font-light flex-1">Distancia recorrida:</p>
                    <p className="flex-1 text-right">{data.stats[0].distancia_recorrida} km</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-white/70 font-light flex-1">Sprints:</p>
                    <p className="flex-1 text-right">{data.stats[0].sprints}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-white/70 font-light flex-1">Duelos ganados:</p>
                    <p className="flex-1 text-right">{data.stats[0].duelosGanados}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-white/70 font-light flex-1">Asistencias:</p>
                    <p className="flex-1 text-right">{data.stats[0].asistencias}</p>
                  </div>

                </div>
              </div>

              <div className="bg-[#1E293B] p-4 rounded-md">
                <div className="p-6 pt-0 h-[350px]">
                  <h3 className="text-xl font-bold mb-4 text-white">Resultados</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={
                      Object.entries(data.stats[0].radar).map(([Key, value]) => ({ subject: capitalize(Key), A: value, fullMark: 100 }))
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
              <div className="bg-[#1E293B] p-6 pt-4 rounded-md h-[350px]">
                <h2 className="text-xl font-semibold mb-6 text-white">Distribución de Tiros</h2>
                <ResponsiveContainer width="100%" height="90%">
                  <PieChart >
                    <Pie
                      data={Object.entries(data.stats[0].distribucionTiros).map(([Key, value]) => ({
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
                        Object.entries(data.stats[0].distribucionTiros).map((_, index) => (
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
          </>
        )}

      </div>

    </div>
  )
}
