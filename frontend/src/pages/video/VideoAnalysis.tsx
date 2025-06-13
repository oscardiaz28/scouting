import { Download, Share } from "lucide-react"
import { useEffect, useState } from "react"
import { Bar, BarChart, Cell, Legend, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { axiosInstance } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { capitalize } from "../../utils/utils";

const demoData = {
  habilidades: [
    {
      subject: "Técnica",
      A: 80,
      B: 90,
      fullMark: 100
    },
    {
      subject: "Velocidad",
      A: 70,
      B: 80,
      fullMark: 100
    },
    {
      subject: "Resistencia",
      A: 86,
      B: 70,
      fullMark: 100
    },
    {
      subject: "Fuerza",
      A: 99,
      B: 70,
      fullMark: 100
    },
    {
      subject: "Toma de Decisiones",
      A: 85,
      B: 80,
      fullMark: 100
    },
    {
      subject: "Visión de Juego",
      A: 65,
      B: 95,
      fullMark: 100
    }
  ],
  acciones: [
    { tipo: "Pases completados", cantidad: 25 },
    { tipo: "Regates", cantidad: 12 },
    { tipo: "Tiros", cantidad: 4 },
    { tipo: "Intercepciones", cantidad: 7 },
    { tipo: "Faltas cometidas", cantidad: 2 }
  ],
  velocidad: [
    { tiempo: 0, velocidad: 3 },
    { tiempo: 1, velocidad: 5 },
    { tiempo: 2, velocidad: 7 },
    { tiempo: 3, velocidad: 6 },
    { tiempo: 4, velocidad: 8 }
  ],
  zonasCampo: [
    { zona: "Defensiva", tiempo: 40 },
    { zona: "Media", tiempo: 30 },
    { zona: "Ofensiva", tiempo: 30 }
  ]
}

interface RadarStats {
  tecnica: number;
  resistencia: number;
  fuerza: number;
  visionJuego: number;
}

interface Distribucion {
  [key: string]: number
}

interface Stat {
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
  distribucionPases: Distribucion,
  distribucionTiros: Distribucion
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const tirosLabels: Record<string, string> = {
  dentroArea: "Dentro del Area",
  fueraArea: "Fuera del Area",
  cabeza: "De Cabeza",
  pieIzquierdo: "Pie Izquierdo",
   pieDerecho: "Pie Derecho"
}

export const VideoAnalysis = () => {

  const { id } = useParams<{ id: string }>()
  const [stats, setStats] = useState<Stat>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resp = await axiosInstance.get(`/videos/${id}`)
        setStats(resp.data)
      } catch (err) {
        console.log("Error al obtener stats")
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [id])

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <div className="">

      <div className="mt-4 flex flex-row items-center justify-between gap-2">
        <div>
          <p className="text-xl font-semibold text-gray-300">Entrenamiento realizado el dia de ayer</p>
          <div>
            <p className="text-md text-gray-500">17 Abril, 2025</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="font-base text-gray-400 text-md">Jugador: </span>
          <p className="text-md font-semibold">John Doe</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[3fr_2fr] mt-8 gap-6">

        {/* left */}
        <div className="grid grid-cols-1 gap-6">

          {/* video */}
          <div className="overflow-hidden rounded-lg border border-gray-400">
            <video src="/videos/train.mp4" muted={true} controls className="w-full"></video>
          </div>

          {/* bar chart */}
          <div className="p-4 bg-[#1A1C1E] rounded-md h-[350px]">
            <h3 className="text-xl font-bold mb-6 text-white">Acciones Realizadas</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={[
                { tipo: "Pases", cantidad: stats?.pasesCompletados },
                { tipo: "Regates", cantidad: stats?.regates },
                { tipo: "Tiros", cantidad: stats?.tiros },
                { tipo: "Intercepciones", cantidad: stats?.intercepciones }
              ]}>
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="p-4 bg-[#1A1C1E] rounded-m h-[350px]">
            <h2 className="text-xl font-semibold mb-6 text-white">Distribución de Pases</h2>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart >
                <Pie
                  data={Object.entries(stats!.distribucionPases).map(([Key, value]) => ({
                    name: Key, 
                    value
                  }) )}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#00bcd4"
                >
                  {
                    Object.entries(stats!.distribucionTiros).map( (_, index) => (
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

        {/* right */}
        <div className="flex flex-col gap-6">

          <div className="bg-[#1A1C1E] p-4 rounded-md border-1 border-gray-800 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-4">Acciones</h2>
            <div className="w-full bg-[#127055] rounded-md flex items-start gap-4 p-3 px-7 cursor-pointer 
            hover:bg-[#0a634a]">
              <Download />
              <p>Descargar Reporte de Analisis</p>
            </div>
            <div className="w-full rounded-md justify-start px-7 p-3 cursor-pointer flex items-center gap-4">
              <Share />
              <p>Compartir Estadísticias</p>
            </div>
          </div>

          {/* radar chart */}
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
                  }) )}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#00bcd4"
                >
                  {
                    Object.entries(stats!.distribucionTiros).map( (_, index) => (
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
