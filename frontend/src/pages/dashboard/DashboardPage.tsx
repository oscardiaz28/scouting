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
        <div className="grid md:grid-cols-[1fr_2fr] gap-5 mt-9">

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

    </div>

  )
}
