import { UserCheck, UserPlus, Video, Zap } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Pie,
  Cell,
  PieChart
} from "recharts";
import { Indicators } from "./components/Indicators";

const data = [
  { habilidad: "Pases", cantidad: 120 },
  { habilidad: "Tiros", cantidad: 85 },
  { habilidad: "Regates", cantidad: 95 },
  { habilidad: "Velocidad", cantidad: 60 },
  { habilidad: "Defensa", cantidad: 70 },
];

const tiposjugadas = [
  { name: 'Bicletas', value: 70 },
  { name: 'Regates', value: 30 },
  { name: 'Desbordes', value: 40 },
  { name: 'Remates', value: 20 },
]
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

export const DashboardPage = () => {


  return (
    <div className="grid grid-cols-1 gap-8">

      <div className="grid grid-cols-1 gap-8">
        {/* Indicators Component */}
        <Indicators />

        {/* Bar Chart */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-5">

           {/* Pie chart */}
          <div className=" p-5">
            <div className="w-full h-[350px] ">
              <h2 className="font-bold text-xl mb-6">Ultimo Análisis</h2>
              <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                  <Pie
                    data={tiposjugadas}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {tiposjugadas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20' }}
                    itemStyle={{ color: '#ffffff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 pt-0 w-full h-[400px] flex flex-col gap-5 bg-[#1A1C1E] rounded-md ">
            <h2 className="pl-4 pt-4 font-bold text-xl">Habilidades Detectadas por la IA</h2>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="habilidad" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#00A9BE" barSize={30}  />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Table Data */}
        <div className="w-full overflow-y-auto scrollbar pb-4 bg-[#1A1C1E] p-5 rounded-md">
          <h2 className="font-bold text-xl mb-6">Actividad Reciente</h2>
          <table className="w-full table-auto border-collapse rounded-md overflow-hidden">
            <thead className="bg-[#0f0e0e] rounded-md">
              <tr className="">
                <th className="py-3 px-3">Jugador</th>
                <th className="py-3 px-3">Posición</th>
                <th className="py-3 px-3">Edad</th>
                <th className="py-3 px-3">Estado del Analisis</th>
                <th className="py-3 px-3">Puntaje IA</th>
                <th className="py-3 px-3">Habilidad Destacada</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border-b border-b-[#232323] cursor-pointer">
                <td className="py-4 px-3">John Doe</td>
                <td className="py-4 px-3">Delantero</td>
                <td className="py-4 px-3">18</td> 
                <td className="py-4 px-3">✅ Completado</td>
                <td className="py-4 px-3">78/100</td>
                <td className="py-4 px-3">Finalización (92)</td>
              </tr>
              <tr className="text-center border-b border-b-[#232323] cursor-pointer">
                <td className="py-4 px-3">John Doe</td>
                <td className="py-4 px-3">Delantero</td>
                <td className="py-4 px-3">18</td>
                <td className="py-4 px-3">⏳ En Proceso</td>
                <td className="py-4 px-3">78/100</td>
                <td className="py-4 px-3">Finalización (92)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

  )
}
