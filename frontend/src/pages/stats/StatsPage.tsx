import { Volleyball } from "lucide-react";
import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

export default function StatsPage() {
  const promedioHabilidades = [
    { skill: "Velocidad", value: 78 },
    { skill: "Pase", value: 81 },
    { skill: "Regate", value: 76 },
    { skill: "Tiro", value: 70 },
    { skill: "Resistencia", value: 84 },
    { skill: "Defensa", value: 68 }
  ];

  const promedioAcciones = [
    { tipo: "Pases completados", cantidad: 160 },
    { tipo: "Regates", cantidad: 90 },
    { tipo: "Tiros", cantidad: 40 },
    { tipo: "Intercepciones", cantidad: 60 },
    { tipo: "Faltas cometidas", cantidad: 22 }
  ];

  const distribucionPosiciones = [
    { posicion: "Delantero", cantidad: 15 },
    { posicion: "Mediocampista", cantidad: 20 },
    { posicion: "Defensa", cantidad: 10 },
    { posicion: "Arquero", cantidad: 5 }
  ];

  const rendimientoPorFecha = [
    { fecha: "01/03", promedio: 70 },
    { fecha: "05/03", promedio: 74 },
    { fecha: "10/03", promedio: 69 },
    { fecha: "15/03", promedio: 76 },
    { fecha: "20/03", promedio: 80 }
  ];

  const zonasPreferidas = [
    { zona: "Defensiva", tiempo: 33 },
    { zona: "Media", tiempo: 40 },
    { zona: "Ofensiva", tiempo: 27 }
  ];

  const topJugadores = [
    { nombre: "Carlos Ruiz", goles: 12, asistencias: 7, partidos: 10 },
    { nombre: "Juan Pérez", goles: 10, asistencias: 5, partidos: 11 },
    { nombre: "Luis Mendoza", goles: 9, asistencias: 6, partidos: 9 },
    { nombre: "Pedro Ramírez", goles: 8, asistencias: 4, partidos: 12 },
    { nombre: "Sergio Díaz", goles: 7, asistencias: 5, partidos: 10 }
  ];

  return (
    <div className="flex flex-col gap-20 p-6">

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Radar Chart Promedio */}
        <div className="h-[300px] w-full">
            <h2 className="text-xl font-semibold mb-2">Promedio de Habilidades</h2>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={promedioHabilidades}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <Radar dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
            
        </div>

        {/* Bar Chart Promedio Acciones */}
        <div className="h-[300px] w-full">
            <h2 className="text-xl font-semibold mb-2">Acciones Totales</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={promedioAcciones}>
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Pie Chart Posiciones */}
        <div className="h-[300px] w-full">
            <h2 className="text-xl font-semibold mb-2">Distribución por Posición</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart >
                <Pie
                    data={distribucionPosiciones}
                    dataKey="cantidad"
                    nameKey="posicion"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#ffc658"
                    label
                />
                <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>

        </div>
        
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Line Chart Promedio por Fecha */}
        <div className="w-full h-[350px]">
            <h2 className="text-xl font-semibold mb-2">Rendimiento Promedio Reciente</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart  data={rendimientoPorFecha}>
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="promedio" stroke="#ff7300" />
                </LineChart>
            </ResponsiveContainer>
        </div>

        {/* Pie Chart de Zonas */}
        <div className="w-full h-[350px]">
            <h2 className="text-xl font-semibold mb-2">Zonas más Ocupadas en el Campo</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart >
                <Pie
                    data={zonasPreferidas}
                    dataKey="tiempo"
                    nameKey="zona"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#00bcd4"
                    label
                />
                <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>

        </div>

        <div className="col-span-1 md:col-span-2 bg-[#1A1C1E] pb-4 p-5 rounded-md">
        <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-xl">Top 5 Jugadores</h2>
            <select name="" id="" className="border-1 border-[#494949] p-2 px-4 rounded-md appearance-none 
            bg-[#0F0E0E] outline-0">
                <option value="goles">Goles</option>
                <option value="goles">Asistencias</option>
                <option value="partidos">Partidos</option>
            </select>
        </div>
        <div className="overflow-auto rounded-lg shadow" >
            <table className="min-w-full bg-[#1A1C1E]">
            <thead>
                <tr className="bg-[#0F0E0E] text-white uppercase text-sm leading-normal ">
                <th className="py-3 px-6 text-left">Jugador</th>
                <th className="py-3 px-6 text-center">Goles</th>
                <th className="py-3 px-6 text-center">Asistencias</th>
                <th className="py-3 px-6 text-center">Partidos</th>
                </tr>
            </thead>
            <tbody className="text-base font-normal text-white">
                {topJugadores.map((j, i) => (
                <tr key={i} className="border-b border-[#232323] ">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{j.nombre}</td>
                    <td className="py-3 px-6 text-center">{j.goles}</td>
                    <td className="py-3 px-6 text-center">{j.asistencias}</td>
                    <td className="py-3 px-6 text-center">{j.partidos}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>

    </div>
  );
}
